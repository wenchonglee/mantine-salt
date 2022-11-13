import { Carousel, CarouselProps, Embla } from "@mantine/carousel";
import {
  ActionIcon,
  AspectRatio,
  Box,
  createStyles,
  DefaultProps,
  getDefaultZIndex,
  Image,
  Modal,
  Selectors,
  Stack,
} from "@mantine/core";
import { IconX } from "@tabler/icons";
import { useMemo, useState } from "react";
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

export const LightboxCarousel = (props: LightboxCarouselProps) => {
  const { imageSrc } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSrc, setSelectedSrc] = useState<string>();

  const { classes } = useStyles();
  const [embla, setEmbla] = useState<Embla | null>(null);
  const [embla2, setEmbla2] = useState<Embla | null>(null);
  const isOverflowing = embla ? embla.slidesInView().length < imageSrc.length : true;
  const isOverflowing2 = embla2 ? embla2.slidesInView().length < imageSrc.length : true;

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
      <Carousel {...commonCarouselProps} getEmblaApi={setEmbla} withControls={isOverflowing}>
        {carouselSlides}
      </Carousel>

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
            <Carousel {...commonCarouselProps} getEmblaApi={setEmbla2} withControls={isOverflowing2}>
              {carouselSlides}
            </Carousel>
          </Box>
        </Stack>
      </Modal>
    </>
  );
};
