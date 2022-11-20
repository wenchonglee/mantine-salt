import { Anchor, Badge, Box, Card, Code, CSSObject, Group, Tabs, Text, Title } from "@mantine/core";
import { DemoContent, DemoHeader, DemoShell, Source } from "../core";
import { ScrollableTabs } from "./ScrollableTabs";

const cardStyles: CSSObject = {
  width: "600px",
  resize: "horizontal",
};

const dummyArray = new Array(10).fill(undefined);

export const ScrollableTabsDemo = () => {
  return (
    <Box>
      <DemoHeader>
        <Box>
          <Badge color="yellow">Abandoned</Badge>
        </Box>

        <Group position="apart" align="flex-end">
          <Title>Scrollable Tabs</Title>

          <Source
            componentLink="https://github.com/wenchonglee/mantine-salt/blob/main/src/ScrollableTabs/ScrollableTabs.tsx"
            demoLink="https://github.com/wenchonglee/mantine-salt/blob/main/src/ScrollableTabs/ScrollableTabsDemo.tsx"
          />
        </Group>

        <Text>
          This component forces tabs to be in a single row, instead of Mantine's default of wrapping to the next line.
          <br /> <br /> Uses{" "}
          <Anchor href="https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver">Resize Observer</Anchor> to
          check if tabs have overflown, and left/right buttons are rendered if it has.
          <br /> Tabs can be also be scrolled by mouse wheel or swipe gesture
        </Text>
      </DemoHeader>

      <DemoContent>
        <Title order={2}>Usage</Title>
        <Text>
          <Code>ScrollableTabs</Code> has a similar API as Mantine's <Code>Tabs</Code>, you can use{" "}
          <Code>Tabs.List</Code>, <Code>Tabs.Tab</Code> and <Code>Tabs.Panel</Code> as you normally would.
        </Text>

        <DemoShell header="Default" description="Responsive when resized" snippet={snippetA}>
          <Card withBorder sx={cardStyles}>
            <ScrollableTabs defaultValue="0">
              <Tabs.List>
                {dummyArray.map((_, index) => {
                  return (
                    <Tabs.Tab key={index} value={`${index}`}>
                      Tab {index}
                    </Tabs.Tab>
                  );
                })}
              </Tabs.List>

              {dummyArray.map((_, index) => {
                return (
                  <Tabs.Panel key={index} value={`${index}`} mt="md">
                    <Text>
                      Tab {index}
                      <br />
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                      the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
                      type and scrambled it to make a type specimen book.
                    </Text>
                  </Tabs.Panel>
                );
              })}
            </ScrollableTabs>
          </Card>
        </DemoShell>

        <DemoShell header="Short tabs" description="No arrow buttons if it hasn't overflown">
          <ScrollableTabs defaultValue="0">
            <Tabs.List>
              {dummyArray.slice(0, 3).map((_, index) => {
                return (
                  <Tabs.Tab key={index} value={`${index}`}>
                    Tab {index}
                  </Tabs.Tab>
                );
              })}
            </Tabs.List>
          </ScrollableTabs>
        </DemoShell>

        <DemoShell header="No resize observer">
          <Card withBorder sx={cardStyles}>
            <ScrollableTabs defaultValue="0" hasResizeObserver={false}>
              <Tabs.List>
                {dummyArray.map((_, index) => {
                  return (
                    <Tabs.Tab key={index} value={`${index}`}>
                      Tab {index}
                    </Tabs.Tab>
                  );
                })}
              </Tabs.List>

              {dummyArray.map((_, index) => {
                return (
                  <Tabs.Panel key={index} value={`${index}`} mt="md">
                    <Text>
                      Tab {index}
                      <br />
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                      the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
                      type and scrambled it to make a type specimen book.
                    </Text>
                  </Tabs.Panel>
                );
              })}
            </ScrollableTabs>
          </Card>
        </DemoShell>
      </DemoContent>
    </Box>
  );
};

const snippetA = `
<ScrollableTabs defaultValue="0">
  <Tabs.List>
    {dummyArray.map((_, index) => {
      return (
        <Tabs.Tab key={index} value={\`\${index}\`}>
          Tab {index}
        </Tabs.Tab>
      );
    })}
  </Tabs.List>

  {dummyArray.map((_, index) => {
    return (
      <Tabs.Panel key={index} value={\`\${index}\`} mt="md">
        <Text>
          Tab {index}
          <br />
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
          the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
          type and scrambled it to make a type specimen book.
        </Text>
      </Tabs.Panel>
    );
  })}
</ScrollableTabs>
`;
