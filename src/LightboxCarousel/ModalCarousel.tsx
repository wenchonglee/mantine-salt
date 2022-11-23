import { Carousel } from "@mantine/carousel";
import { ActionIcon, Box, createStyles, getDefaultZIndex, Image, ImageProps, Modal, Stack } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconX } from "@tabler/icons";
import { LightboxImage } from "./LightboxImage";

const useCarouselStyles = createStyles((theme) => ({
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
  image: {
    aspectRatio: "1",
  },
  imageFigure: {
    transition: "filter 250ms ease",
    "&:hover": {
      cursor: "pointer",
      filter: "brightness(80%)",
    },
  },
}));

type ModalCarouselProps = {
  isModalOpen: boolean;
  setIsModalOpen(isOpen: boolean): void;
  imageSrc: string[];
  selectedSrc: string | undefined;
  onChangeImage(src: string): void;
  imageWidth: ImageProps["width"];
};

export const ModalCarousel = (props: ModalCarouselProps) => {
  const { isModalOpen, setIsModalOpen, imageSrc, selectedSrc, onChangeImage, imageWidth } = props;
  const isSmallViewport = useMediaQuery("(max-width: 800px)");
  const { classes } = useCarouselStyles();

  return (
    <Modal
      fullScreen={isSmallViewport}
      opened={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      overlayBlur={1}
      size="75%"
      trapFocus={false}
      withCloseButton={false}
    >
      <ActionIcon variant="default" className={classes.closeButton} onClick={() => setIsModalOpen(false)}>
        <IconX />
      </ActionIcon>

      <Stack p={0} sx={{ overflow: "hidden" }}>
        <Box pos="relative">
          <LightboxImage key={selectedSrc} src={selectedSrc} carouselImageWidth={imageWidth} />
        </Box>

        <Box>
          <Carousel
            classNames={{ control: classes.carouselControl }}
            align="center"
            draggable={isSmallViewport}
            dragFree={isSmallViewport}
            slideGap="xs"
            slidesToScroll={"auto"}
          >
            {imageSrc.map((src, index) => (
              <Carousel.Slide size={imageWidth} key={index}>
                <Image
                  classNames={{
                    image: classes.image,
                    figure: classes.imageFigure,
                  }}
                  fit="cover"
                  radius="md"
                  src={src}
                  onClick={() => onChangeImage(src)}
                />
              </Carousel.Slide>
            ))}
          </Carousel>
        </Box>
      </Stack>
    </Modal>
  );
};
