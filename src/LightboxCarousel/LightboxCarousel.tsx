import { Carousel, Embla } from "@mantine/carousel";
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
import { useState } from "react";
import { LightboxImage } from "./LightboxImage";

type SomeProps = {};

const useStyles = createStyles((theme, {}: SomeProps) => ({
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

  const { classes } = useStyles({});

  const [embla, setEmbla] = useState<Embla | null>(null);
  //! if viewport height is smaller than x, dont render carousel in modal
  console.log(embla?.slidesInView());

  const carousel = (
    <Carousel
      slideGap="xs"
      height="200px"
      getEmblaApi={setEmbla}
      styles={{
        control: {
          "&[data-inactive]": {
            opacity: 0,
            cursor: "default",
          },
        },
      }}
    >
      {imageSrc.map((src, index) => (
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
      ))}
    </Carousel>
  );

  return (
    <>
      {carousel}

      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size="80%"
        overlayBlur={1}
        withCloseButton={false}
        trapFocus={false}
      >
        <ActionIcon variant="default" className={classes.closeButton} onClick={() => setIsModalOpen(false)}>
          <IconX />
        </ActionIcon>

        <Stack
          p={0}
          sx={{
            overflow: "hidden",
          }}
        >
          <Box pos="relative">
            <LightboxImage src={selectedSrc} />
          </Box>

          <Box m="md">{carousel}</Box>
        </Stack>
      </Modal>
    </>
  );
};
