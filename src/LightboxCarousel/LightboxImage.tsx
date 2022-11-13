import { createStyles, Image, ImageProps } from "@mantine/core";
import { useLayoutEffect, useRef, useState } from "react";

type ImageState = "contain" | "full-size" | "locked";
type LightboxImageStyleProps = {
  imageSize: ImageState;
};

const useStyles = createStyles((theme, { imageSize }: LightboxImageStyleProps) => ({
  root: {
    "&:hover": {
      cursor: imageSize === "locked" ? "default" : imageSize === "contain" ? "zoom-in" : "zoom-out",
    },
  },
  image: {
    margin: "0 auto",
  },
}));

export const LightboxImage = (props: ImageProps) => {
  const [imageSize, setImageSize] = useState<ImageState>("contain");
  const { classes } = useStyles({ imageSize });
  const ref = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    if (ref.current) {
      console.log(
        "natural w",
        ref.current.naturalWidth,
        "natural h",
        ref.current.naturalHeight,
        "--",
        ref.current.width,
        ref.current.offsetWidth,
        ref.current.height,
        ref.current.offsetHeight
      );
      if (
        ref.current.naturalWidth <= ref.current.clientWidth &&
        ref.current.naturalHeight <= ref.current.clientHeight
      ) {
        setImageSize("locked");
      } else {
        console.log("!");
        setImageSize("contain");
      }
    }
  }, [props.src]);

  const handleClick = () => {
    setImageSize((prevState) => {
      switch (prevState) {
        case "contain":
          return "full-size";
        case "full-size":
          return "contain";
        case "locked":
          return "locked";
      }
    });
  };

  const imageProps: ImageProps =
    imageSize === "contain"
      ? {
          fit: "contain",
          height: "calc(100vh - 400px)",
          width: "100%",
        }
      : {
          fit: "unset",
          height: "auto",
          width: "auto",
        };

  return (
    <Image
      imageRef={ref}
      classNames={{
        root: classes.root,
        image: classes.image,
      }}
      onClick={handleClick}
      {...imageProps}
      {...props}
    />
  );
};
