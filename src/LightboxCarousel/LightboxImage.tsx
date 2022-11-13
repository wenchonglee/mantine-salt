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
      const { naturalWidth, naturalHeight, clientWidth, clientHeight } = ref.current;

      if (naturalWidth <= clientWidth && naturalHeight <= clientHeight) {
        setImageSize("locked");
      } else {
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
    imageSize === "contain" || imageSize === "locked"
      ? {
          fit: imageSize === "locked" ? "none" : "contain",
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
