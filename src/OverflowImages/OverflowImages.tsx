import { Box, Group, Image } from "@mantine/core";
import { debounce } from "lodash";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { ModalCarousel } from "./ModalCarousel";
import * as classes from "./overflowimages.module.css";

interface OverflowImagesProps {
  imageSrc: string[];
  imageWidth?: number;
  debounceWait?: number;
}

/** Default image width */
const IMAGE_WIDTH = 200;

/** Default debounce wait time (ms) */
const DEBOUNCE_WAIT = 50;

export const OverflowImages = (props: OverflowImagesProps) => {
  const { imageSrc, imageWidth = IMAGE_WIDTH, debounceWait = DEBOUNCE_WAIT } = props;

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
          availableWidth -= imageWidth + 16;
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
      <Box>
        <Group ref={ref} className={classes.imageList} wrap="nowrap">
          {imageSrc.map((src, index) => (
            <Box key={index} className={classes.imageContainer} onClick={() => onChangeImage(src)}>
              {overflownIndex !== Infinity && index === overflownIndex - 1 && (
                <Box className={classes.imageOverlay}>+{imageSrc.length - overflownIndex}</Box>
              )}

              <Image
                fit="cover"
                radius="md"
                src={src}
                w={imageWidth}
                h={imageWidth}
                style={{
                  visibility: index >= overflownIndex ? "hidden" : "visible",
                  filter: overflownIndex !== Infinity && index === overflownIndex - 1 ? "brightness(20%)" : undefined,
                  aspectRatio: 1,
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
