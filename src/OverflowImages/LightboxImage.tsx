import { Image, ImageProps } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useLayoutEffect, useRef, useState } from "react";
import * as classes from "./lightbox.module.css";
import clsx from "clsx";

/**
 * contain = limited size
 * full-size = let the image grow to full size
 * locked = don't allow toggling between contain and full-size (locked by default if the image is small enough to not need zoom)
 */
type ImageState = "contain" | "full-size" | "locked";

export const LightboxImage = (props: ImageProps & { carouselImageWidth: ImageProps["w"] }) => {
  const { carouselImageWidth, ...others } = props;

  const [imageSize, setImageSize] = useState<ImageState>("contain");
  const isSmallViewport = useMediaQuery("(max-width: 800px)");
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
          h: isSmallViewport
            ? `calc(100vh - ${carouselImageWidth}px - 64px)`
            : `calc(100vh - 64px - ${carouselImageWidth}px - 64px)`,
          w: "100%",
        }
      : {
          fit: "unset",
          h: "auto",
          w: "auto",
        };

  return (
    <Image
      ref={ref}
      className={clsx(classes.image, {
        [classes.contain]: imageSize === "contain",
        [classes.full]: imageSize === "full-size",
      })}
      onClick={handleClick}
      {...imageProps}
      {...others}
    />
  );
};
