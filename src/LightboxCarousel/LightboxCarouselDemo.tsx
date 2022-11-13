import { Card, Flex, Stack, Title } from "@mantine/core";
import { DemoShell } from "../core";
import { LightboxCarousel } from "./LightboxCarousel";

const sources = [
  "https://avatars.githubusercontent.com/u/18256786?v=4",
  "https://images.unsplash.com/photo-1668241515225-7278e4b0ef56?w=640&q=80",
  "https://images.unsplash.com/photo-1668194645745-45709d2272d1?w=1170&q=80",
  "https://images.unsplash.com/photo-1668069574922-bca50880fd70?w=687&q=80",
  "https://images.unsplash.com/photo-1636728400756-aeca1eb63a30?w=689&q=80",
  "https://images.unsplash.com/photo-1664795522436-a114faf594fe?w=688&q=80",
  "https://images.unsplash.com/photo-1668259678563-95f9a18e2323?w=687&q=80",
];

export const LightboxCarouselDemo = () => {
  return (
    <Stack>
      <Flex justify="space-between">
        <Title color="red" order={2}>
          Work in progress
        </Title>
        <DemoShell.Source
          componentLink="https://github.com/wenchonglee/mantine-salt/blob/main/src/LightboxCarousel/LightboxCarousel.tsx"
          demoLink="https://github.com/wenchonglee/mantine-salt/blob/main/src/LightboxCarousel/LightboxCarouselDemo.tsx"
        />
      </Flex>

      <DemoShell
        header="Default"
        description="Clicking on an image opens a lightbox. If the image in the lightbox is larger than the space provided, it can be zoomed in."
      >
        <Card w="100%">
          <LightboxCarousel imageSrc={sources} />
        </Card>
      </DemoShell>

      <DemoShell
        header="Fewer items"
        description="If the space can accommodate all images, then no controls are rendered"
      >
        <Card w="100%">
          <LightboxCarousel imageSrc={sources.slice(0, 2)} />
        </Card>
      </DemoShell>
    </Stack>
  );
};
