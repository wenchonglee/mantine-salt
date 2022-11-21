import { Carousel, CarouselProps, Embla } from "@mantine/carousel";
import {
  ActionIcon,
  AspectRatio,
  Box,
  createStyles,
  DefaultProps,
  getDefaultZIndex,
  Group,
  Image,
  Modal,
  Selectors,
  Stack,
} from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { IconX } from "@tabler/icons";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { LightboxImage } from "./LightboxImage";

const useStyles = createStyles((theme) => ({
  carouselControl: {
    "&[data-inactive]": {
      opacity: 0,
      cursor: "default",
    },
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing.sm,
    top: theme.spacing.sm,
    zIndex: getDefaultZIndex("modal"),
  },
}));

type LightboxCarouselStylesNames = Selectors<typeof useStyles>;

interface LightboxCarouselProps extends DefaultProps<LightboxCarouselStylesNames> {
  imageSrc: string[];
}

const BUFFER = 24;

export const LightboxCarousel = (props: LightboxCarouselProps) => {
  const { imageSrc } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSrc, setSelectedSrc] = useState<string>();
  // const matches = useMediaQuery("(max-width: 800px)");

  const { classes } = useStyles();
  const ref = useRef<HTMLDivElement>(null);
  const allRef = useRef<(HTMLDivElement | null)[]>([]);
  const frameID = useRef<number>(0);
  const [embla, setEmbla] = useState<Embla | null>(null);
  const isOverflowing2 = embla ? embla.slidesInView().length < imageSrc.length : true;

  const [overflownIndex, setOverflownIndex] = useDebouncedState(Infinity, 50, { leading: true });

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

  const findOverflownIndex = () => {
    if (ref.current && allRef.current) {
      let availableWidth = ref.current.clientWidth - BUFFER;

      for (let i = 0; i < allRef.current.length; i++) {
        const tabRef = allRef.current[i];
        if (tabRef) {
          availableWidth -= tabRef.clientWidth + 16; //! 16 = gap
          if (availableWidth <= 0) {
            setOverflownIndex(i);
            return;
          }
        }
      }
      setOverflownIndex(allRef.current.length);
    }
  };

  const carouselSlides = useMemo(
    () =>
      imageSrc.map((src, index) => (
        <Carousel.Slide size={200} key={index}>
          <AspectRatio ratio={1}>
            <Image
              height="100%"
              radius="md"
              src={src}
              fit="cover"
              styles={{
                imageWrapper: {
                  height: "100%",
                  width: "100%",
                },
                figure: {
                  height: "100%",
                  width: "100%",
                  transition: "filter 150ms ease",
                  "&:hover": {
                    cursor: "pointer",
                    filter: "brightness(90%)",
                  },
                },
              }}
              onClick={() => {
                setIsModalOpen(true);
                setSelectedSrc(src);
              }}
            />
          </AspectRatio>
        </Carousel.Slide>
      )),
    [imageSrc]
  );

  const commonCarouselProps: CarouselProps = {
    align: "start",
    classNames: {
      control: classes.carouselControl,
    },
    draggable: false,
    height: "200",
    slideGap: "xs",
  };

  return (
    <>
      <Group
        sx={{
          overflow: "hidden",
        }}
        noWrap
        ref={ref}
      >
        {imageSrc.map((src, index) => (
          <Box
            ref={(element: HTMLDivElement | null) => (allRef.current[index] = element)}
            sx={{
              position: "relative",
            }}
          >
            {overflownIndex !== Infinity && index === overflownIndex - 1 && (
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 1,
                  backgroundColor: "black",
                  width: "100%",
                  height: "100%",
                  opacity: 0.8,
                  borderRadius: "8px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    borderRadius: "8px",
                    fontWeight: 500,
                    fontSize: "24px",
                  }}
                >
                  +{imageSrc.length - overflownIndex}
                </Box>
              </Box>
            )}

            <Image
              key={index}
              height="200px"
              width="200px"
              radius="md"
              src={src}
              fit="cover"
              styles={{
                imageWrapper: {
                  height: "100%",
                  width: "100%",
                },
                figure: {
                  height: "100%",
                  width: "100%",
                  transition: "filter 150ms ease",
                  "&:hover": {
                    cursor: "pointer",
                    filter: "brightness(90%)",
                  },
                },
              }}
              style={{ visibility: index >= overflownIndex ? "hidden" : "visible" }}
              onClick={() => {
                setIsModalOpen(true);
                setSelectedSrc(src);
              }}
            />
          </Box>
        ))}
      </Group>

      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size="80%"
        overlayBlur={1}
        trapFocus={false}
        withCloseButton={false}
      >
        <ActionIcon variant="default" className={classes.closeButton} onClick={() => setIsModalOpen(false)}>
          <IconX />
        </ActionIcon>

        <Stack p={0} sx={{ overflow: "hidden" }}>
          <Box pos="relative">
            <LightboxImage src={selectedSrc} />
          </Box>

          <Box m="md">
            <Carousel {...commonCarouselProps} getEmblaApi={setEmbla} withControls={isOverflowing2}>
              {carouselSlides}
            </Carousel>
          </Box>
        </Stack>
      </Modal>
    </>
  );
};
