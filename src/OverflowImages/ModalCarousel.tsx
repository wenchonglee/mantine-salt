import { Carousel } from "@mantine/carousel";
import { ActionIcon, Box, Image, ImageProps, Modal, Stack } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";
import { LightboxImage } from "./LightboxImage";
import * as classes from "./modal.module.css";

type ModalCarouselProps = {
  isModalOpen: boolean;
  setIsModalOpen(isOpen: boolean): void;
  imageSrc: string[];
  selectedSrc: string | undefined;
  onChangeImage(src: string): void;
  imageWidth: ImageProps["w"];
};

export const ModalCarousel = (props: ModalCarouselProps) => {
  const { isModalOpen, setIsModalOpen, imageSrc, selectedSrc, onChangeImage, imageWidth } = props;
  const isSmallViewport = useMediaQuery("(max-width: 800px)");

  return (
    <Modal
      fullScreen={isSmallViewport}
      opened={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      overlayProps={{
        blur: 1,
      }}
      size="75%"
      trapFocus={false}
      withCloseButton={false}
    >
      <ActionIcon variant="default" className={classes.closeButton} onClick={() => setIsModalOpen(false)}>
        <IconX />
      </ActionIcon>

      <Stack p={0} style={{ overflow: "hidden" }}>
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
            slideSize={200}
          >
            {imageSrc.map((src, index) => (
              <Carousel.Slide key={index} w={imageWidth}>
                <Image className={classes.image} fit="cover" radius="md" src={src} onClick={() => onChangeImage(src)} />
              </Carousel.Slide>
            ))}
          </Carousel>
        </Box>
      </Stack>
    </Modal>
  );
};
