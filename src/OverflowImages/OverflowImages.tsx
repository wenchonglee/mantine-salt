import { Box, createStyles, DefaultProps, Group, Image, Selectors } from "@mantine/core";
import { debounce } from "lodash";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { ModalCarousel } from "./ModalCarousel";

const useStyles = createStyles((theme) => ({
  root: {
    flexGrow: 1,
    minWidth: 0,
  },
  imageList: {
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

type OverflowImagesStylesNames = Selectors<typeof useStyles>;

interface OverflowImagesProps extends DefaultProps<OverflowImagesStylesNames> {
  imageSrc: string[];
  imageWidth?: number;
  debounceWait?: number;
}

/** Default image width */
const IMAGE_WIDTH = 200;

/** Default debounce wait time (ms) */
const DEBOUNCE_WAIT = 50;

export const OverflowImages = (props: OverflowImagesProps) => {
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
    name: "OverflowImages",
    classNames,
    styles,
    unstyled,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSrc, setSelectedSrc] = useState<string>();

  const ref = useRef<HTMLDivElement>(null);
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
      if (ref.current) {
        let availableWidth = ref.current.clientWidth;

        for (let i = 0; i < imageSrc.length; i++) {
          // also account for the gap size of Group (theme.spacing.md)
          availableWidth -= imageWidth + theme.spacing.md;
          if (availableWidth <= 0) {
            setOverflownIndex(i);
            return;
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
      <Box className={cx(classes.root, className)}>
        <Group ref={ref} className={classes.imageList} noWrap>
          {imageSrc.map((src, index) => (
            <Box key={index} className={classes.imageContainer} onClick={() => onChangeImage(src)}>
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
      </Box>

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
