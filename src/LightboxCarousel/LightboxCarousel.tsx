import { Box, createStyles, DefaultProps, Group, Image, ImageProps, Selectors } from "@mantine/core";
import { debounce } from "lodash";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { ModalCarousel } from "./ModalCarousel";

const useStyles = createStyles((theme) => ({
  root: {
    overflow: "hidden",
  },
  imageContainer: {
    position: "relative",
    transition: "filter 250ms ease",
    "&:hover": {
      cursor: "pointer",
      filter: "brightness(80%)",
    },
  },
  imageOverlay: {
    fontSize: theme.fontSizes.xl,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 1,
    color: theme.white,
  },
}));

type LightboxCarouselStylesNames = Selectors<typeof useStyles>;

interface LightboxCarouselProps extends DefaultProps<LightboxCarouselStylesNames> {
  imageSrc: string[];
  imageWidth?: ImageProps["width"];
  debounceWait?: number;
}

/** Arbitrary buffer so that overflow is detected "ahead of time" */
const BUFFER = 24;

/** Default image width */
const IMAGE_WIDTH = 200;

/** Default debounce wait time (ms) */
const DEBOUNCE_WAIT = 50;

export const LightboxCarousel = (props: LightboxCarouselProps) => {
  const {
    className,
    classNames,
    styles,
    unstyled,
    imageSrc,
    imageWidth = IMAGE_WIDTH,
    debounceWait = DEBOUNCE_WAIT,
  } = props;

  const { classes, cx, theme } = useStyles(undefined, {
    name: "LightboxCarousel",
    classNames,
    styles,
    unstyled,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSrc, setSelectedSrc] = useState<string>();

  const ref = useRef<HTMLDivElement>(null);
  const allRef = useRef<(HTMLDivElement | null)[]>([]);
  const frameID = useRef<number>(0);

  const [overflownIndex, setOverflownIndex] = useState(Infinity);

  const observer = useMemo(() => {
    if (typeof window === "undefined") {
      return null;
    }

    return new ResizeObserver((entries) => {
      const entry = entries[0];

      if (entry) {
        cancelAnimationFrame(frameID.current);

        frameID.current = requestAnimationFrame(() => {
          findOverflownIndex();
        });
      }
    });
  }, []);

  useLayoutEffect(() => {
    findOverflownIndex();
    if (ref.current) {
      observer?.observe(ref.current);
    }

    return () => {
      observer?.disconnect();

      if (frameID.current) {
        cancelAnimationFrame(frameID.current);
      }
    };
  }, []);

  const findOverflownIndex = debounce(
    () => {
      if (ref.current && allRef.current) {
        let availableWidth = ref.current.clientWidth - BUFFER;

        for (let i = 0; i < allRef.current.length; i++) {
          const tabRef = allRef.current[i];
          if (tabRef) {
            // also account for the gap size of Group (theme.spacing.md)
            availableWidth -= tabRef.clientWidth + theme.spacing.md;
            if (availableWidth <= 0) {
              setOverflownIndex(i);
              return;
            }
          }
        }
        setOverflownIndex(Infinity);
      }
    },
    debounceWait,
    { leading: true }
  );

  const onChangeImage = (src: string) => {
    setIsModalOpen(true);
    setSelectedSrc(src);
  };

  return (
    <>
      <Group ref={ref} className={cx(classes.root, className)} noWrap>
        {imageSrc.map((src, index) => (
          <Box
            key={index}
            ref={(element: HTMLDivElement | null) => (allRef.current[index] = element)}
            className={classes.imageContainer}
            onClick={() => onChangeImage(src)}
          >
            {overflownIndex !== Infinity && index === overflownIndex - 1 && (
              <Box className={classes.imageOverlay}>+{imageSrc.length - overflownIndex}</Box>
            )}

            <Image
              fit="cover"
              radius="md"
              src={src}
              width={imageWidth}
              style={{
                visibility: index >= overflownIndex ? "hidden" : "visible",
                filter: overflownIndex !== Infinity && index === overflownIndex - 1 ? "brightness(20%)" : undefined,
              }}
              styles={{
                image: { aspectRatio: "1" },
              }}
            />
          </Box>
        ))}
      </Group>

      <ModalCarousel
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        imageSrc={imageSrc}
        selectedSrc={selectedSrc}
        onChangeImage={onChangeImage}
        imageWidth={imageWidth}
      />
    </>
  );
};
