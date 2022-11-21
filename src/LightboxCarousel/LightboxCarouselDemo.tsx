import { Badge, Box, Card, CSSObject, Group, Text, Title } from "@mantine/core";
import { DemoContent, DemoHeader, DemoShell, Source } from "../core";
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

const cardStyles: CSSObject = {
  width: "600px",
  resize: "horizontal",
};

export const LightboxCarouselDemo = () => {
  return (
    <Box>
      <DemoHeader>
        <Box>
          <Badge color="red">Work in progress</Badge>
        </Box>

        <Group position="apart" align="flex-end">
          <Title>Lightbox Carousel</Title>

          <Source
            componentLink="https://github.com/wenchonglee/mantine-salt/blob/main/src/LightboxCarousel/LightboxCarousel.tsx"
            demoLink="https://github.com/wenchonglee/mantine-salt/blob/main/src/LightboxCarousel/LightboxCarouselDemo.tsx"
          />
        </Group>

        <Text>TBD</Text>
      </DemoHeader>

      <DemoContent>
        <DemoShell
          header="Default"
          description="Clicking on an image opens a lightbox. If the image in the lightbox is larger than the space provided, it can be zoomed in."
        >
          <Card w="100%" withBorder sx={cardStyles}>
            <LightboxCarousel imageSrc={sources} />
          </Card>
        </DemoShell>

        {/* <DemoShell
          header="Fewer items"
          description="If the space can accommodate all images, then no controls are rendered"
        >
          <Card w="100%">
            <LightboxCarousel imageSrc={sources.slice(0, 2)} />
          </Card>
        </DemoShell> */}
      </DemoContent>
    </Box>
  );
};
