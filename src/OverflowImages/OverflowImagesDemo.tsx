import { Box, Card, CSSObject, Divider, Flex, Group, Text, Title } from "@mantine/core";
import { DemoContent, DemoHeader, DemoShell, Source } from "../core";
import { ProgressHoverCard } from "../core/ProgressBadge";
import { OverflowImages } from "./OverflowImages";

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

export const OverflowImagesDemo = () => {
  return (
    <Box>
      <DemoHeader>
        <Box>
          <ProgressHoverCard stage="2" />
        </Box>

        <Group position="apart" align="flex-end">
          <Title>Overflow Images</Title>

          <Source
            componentLink="https://github.com/wenchonglee/mantine-salt/blob/main/src/OverflowImages/OverflowImages.tsx"
            demoLink="https://github.com/wenchonglee/mantine-salt/blob/main/src/OverflowImages/OverflowImagesDemo.tsx"
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
            <OverflowImages imageSrc={sources} />
          </Card>
        </DemoShell>

        <DemoShell
          header="Fewer items"
          description="If the space can accommodate all images, then no overlay is rendered"
        >
          <Card w="100%">
            <OverflowImages imageSrc={sources.slice(0, 2)} />
          </Card>
        </DemoShell>

        <DemoShell
          header="Custom sized"
          description="The size and debounce wait time can also be customized"
          snippet={snippetC}
        >
          <Card w="100%" withBorder sx={cardStyles}>
            <OverflowImages imageSrc={sources} imageWidth={100} debounceWait={0} />
          </Card>
        </DemoShell>

        <DemoShell
          header="Grid/Flex parents"
          description="When the parent element is a flex or grid, you will need to add min-width: 0"
          snippet={snippetD}
        >
          <Card w="100%" withBorder sx={cardStyles}>
            <Text italic size="xs">
              without <code>min-width: 0</code>, doesn't work correctly
            </Text>

            <Flex>
              <Box>
                <OverflowImages imageSrc={sources} />
              </Box>
            </Flex>
            <Divider my="md" mx="-md" />

            <Text italic size="xs">
              with <code>min-width: 0</code>
            </Text>
            <Flex>
              <Box miw={0}>
                <OverflowImages imageSrc={sources} />
              </Box>
            </Flex>
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
<OverflowImages imageSrc={sources} />
`;

const snippetC = `
<OverflowImages imageSrc={sources} imageWidth={100} debounceWait={0} />
`;

const snippetD = `
<Flex>
  <Box>
    <OverflowImages imageSrc={sources} />
  </Box>
</Flex>

<Divider my="md" mx="-md" />

<Flex>
  <Box miw={0}>
    <OverflowImages imageSrc={sources} />
  </Box>
</Flex>
`;
