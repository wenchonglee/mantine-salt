import { createStyles, Image, ImageProps } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useLayoutEffect, useRef, useState } from "react";

/**
 * contain = limited size
 * full-size = let the image grow to full size
 * locked = don't allow toggling between contain and full-size (locked by default if the image is small enough to not need zoom)
 */
type ImageState = "contain" | "full-size" | "locked";
type LightboxImageStyleProps = {
  imageSize: ImageState;
};

const useStyles = createStyles((_theme, { imageSize }: LightboxImageStyleProps) => ({
  root: {
    overflow: "auto",
    "&:hover": {
      cursor: imageSize === "locked" ? "default" : imageSize === "contain" ? "zoom-in" : "zoom-out",
    },
  },
  image: {
    margin: "0 auto",
  },
}));

export const LightboxImage = (props: ImageProps & { carouselImageWidth: ImageProps["width"] }) => {
  const { carouselImageWidth, ...others } = props;

  const [imageSize, setImageSize] = useState<ImageState>("contain");
  const isSmallViewport = useMediaQuery("(max-width: 800px)");
  const { classes, theme } = useStyles({ imageSize });
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
          // 100vh - modal padding - image height - buffer
          height: isSmallViewport
            ? `calc(100vh - ${carouselImageWidth}px - ${theme.spacing.md * 4}px)`
            : `calc(100vh - ${theme.spacing.xl * 4}px - ${carouselImageWidth}px - ${theme.spacing.md * 4}px)`,
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
      {...others}
    />
  );
};
