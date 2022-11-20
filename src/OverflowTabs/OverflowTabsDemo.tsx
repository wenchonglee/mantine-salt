import { Card, CSSObject, Flex, Stack, Tabs, Text } from "@mantine/core";
import { DemoShell } from "../core";
import { OverflowTabs } from "./OverflowTabs";

const cardStyles: CSSObject = {
  width: "600px",
  resize: "horizontal",
};

const dummyArray = new Array(10).fill(undefined);

export const OverflowTabsDemo = () => {
  return (
    <Stack>
      <Flex justify="flex-end">
        <DemoShell.Source
          componentLink="https://github.com/wenchonglee/mantine-salt/blob/main/src/OverflowTabs/OverflowTabs.tsx"
          demoLink="https://github.com/wenchonglee/mantine-salt/blob/main/src/OverflowTabs/OverflowTabsDemo.tsx"
        />
      </Flex>

      <DemoShell
        header="Default"
        description="Has a resize observer to update TabsList overflow state. 
        When overflown, left/right buttons are rendered (tabs can be also be scrolled by mouse wheel or swipe gesture)"
      >
        <Card withBorder sx={cardStyles}>
          <OverflowTabs defaultValue="0">
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
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                    and scrambled it to make a type specimen book.
                  </Text>
                </Tabs.Panel>
              );
            })}
          </OverflowTabs>
        </Card>
      </DemoShell>

      <DemoShell header="No resize observer">
        <Card withBorder sx={cardStyles}>
          <OverflowTabs defaultValue="0" hasResizeObserver={false}>
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
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                    and scrambled it to make a type specimen book.
                  </Text>
                </Tabs.Panel>
              );
            })}
          </OverflowTabs>
        </Card>
      </DemoShell>
    </Stack>
  );
};
