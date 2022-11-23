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
          <Badge color="lime">Functional</Badge>
        </Box>

        <Group position="apart" align="flex-end">
          <Title>Lightbox Carousel</Title>

          <Source
            componentLink="https://github.com/wenchonglee/mantine-salt/blob/main/src/LightboxCarousel/LightboxCarousel.tsx"
            demoLink="https://github.com/wenchonglee/mantine-salt/blob/main/src/LightboxCarousel/LightboxCarouselDemo.tsx"
          />
        </Group>

        <Text>
          This component renders a list of images in a single row, hiding the images that cannot fit. <br />
          When any image is clicked, a lightbox (i.e. a Modal) is opened, and all images can be scrolled through via a
          Carousel.
          <br /> If the viewport is smaller than 800px, then the lightbox becomes full screen
        </Text>
      </DemoHeader>

      <DemoContent>
        <DemoShell header="Default" snippet={snippetA}>
          <Card w="100%" withBorder sx={cardStyles}>
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

        <DemoShell
          header="Custom sized"
          description="The size and debounce wait time can also be customized"
          snippet={snippetC}
        >
          <Card w="100%" withBorder sx={cardStyles}>
            <LightboxCarousel imageSrc={sources} imageWidth={100} debounceWait={0} />
          </Card>
        </DemoShell>
      </DemoContent>
    </Box>
  );
};

const snippetA = `
const sources = [
  "https://avatars.githubusercontent.com/u/18256786?v=4",
  "https://images.unsplash.com/photo-1668241515225-7278e4b0ef56?w=640&q=80",
  "https://images.unsplash.com/photo-1668194645745-45709d2272d1?w=1170&q=80",
  "https://images.unsplash.com/photo-1668069574922-bca50880fd70?w=687&q=80",
  "https://images.unsplash.com/photo-1636728400756-aeca1eb63a30?w=689&q=80",
  "https://images.unsplash.com/photo-1664795522436-a114faf594fe?w=688&q=80",
  "https://images.unsplash.com/photo-1668259678563-95f9a18e2323?w=687&q=80",
];
//...
<LightboxCarousel imageSrc={sources} />
`;

const snippetC = `
<LightboxCarousel imageSrc={sources} imageWidth={100} debounceWait={0} />
`;
