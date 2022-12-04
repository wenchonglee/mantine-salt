import { Anchor, Box, Button, Card, Code, CSSObject, Group, HoverCard, List, Text, Title } from "@mantine/core";
import { IconBrandAmongus } from "@tabler/icons";
import { useState } from "react";
import { DemoContent, DemoHeader, DemoShell, Source } from "../core";
import { ProgressHoverCard } from "../core/ProgressBadge";
import { OverflowTabs } from "./OverflowTabs";

const cardStyles: CSSObject = {
  width: "600px",
  resize: "horizontal",
};

const dummyArray = new Array(10).fill(undefined);

export const OverflowTabsDemo = () => {
  const [value, setValue] = useState<string | null>("0");

  return (
    <Box>
      <DemoHeader>
        <Box>
          <ProgressHoverCard stage="2" />
        </Box>

        <Group position="apart" align="flex-end">
          <Title>Overflow Tabs</Title>

          <Source
            componentLink="https://github.com/wenchonglee/mantine-salt/blob/main/src/OverflowTabs/OverflowTabs.tsx"
            demoLink="https://github.com/wenchonglee/mantine-salt/blob/main/src/OverflowTabs/OverflowTabsDemo.tsx"
          />
        </Group>

        <Text>
          This component forces tabs to be in a single row, instead of Mantine's default of wrapping to the next line.
          <br /> <br /> Uses{" "}
          <Anchor href="https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver">Resize Observer</Anchor> to
          check if tabs have overflown, and render a <Code>Menu</Code> at the end if it has.
          <p>Caveats</p>
          <List>
            <List.Item>This is only styled for the default variant</List.Item>
          </List>
        </Text>
      </DemoHeader>

      <DemoContent>
        <Title order={2}>Usage</Title>
        <Text>
          Unlike <Code>ScrollableTabs</Code>, <Code>OverflowTabs</Code> has a limited API and is different from
          Mantine's default.
          <br /> It doesn't accept children and all tab specifications are passed via props.
        </Text>

        <DemoShell header="Default" snippet={snippetA}>
          <Card withBorder sx={cardStyles}>
            <OverflowTabs
              value={value}
              onTabChange={setValue}
              tabs={dummyArray.map((_, index) => ({
                value: `${index}`,
                label: `Tab ${index === 7 ? "longer text-longer text-longer text" : index}`,
                rightSection: index === 0 ? <IconBrandAmongus /> : undefined,
              }))}
            />
          </Card>
        </DemoShell>

        <DemoShell header="Uncontrolled, without bounding box" snippet={snippetB}>
          <OverflowTabs
            tabs={dummyArray.map((_, index) => ({
              value: `${index}`,
              label: `Tab ${index}`,
            }))}
            defaultValue="2"
          />
        </DemoShell>

        <DemoShell
          header="Custom overflow button"
          snippet={snippetC}
          description={`You can pass in overflow props to customize how the overflow button looks and behaves. \nThe default debounce time can also be overridden.`}
        >
          <Card withBorder sx={cardStyles}>
            <OverflowTabs
              tabs={dummyArray.map((_, index) => ({
                value: `${index}`,
                label: `Tab ${index}`,
              }))}
              defaultValue="2"
              debounceWait={0}
              overflowBuffer={80}
              overflowComponent={(tabs, selectedTab, onTabChange) => (
                <HoverCard withinPortal>
                  <HoverCard.Target>
                    <Button compact variant="subtle">
                      Show More
                    </Button>
                  </HoverCard.Target>

                  <HoverCard.Dropdown>
                    <Button.Group orientation="vertical">
                      {tabs.map((tab) => (
                        <Button
                          key={tab.value}
                          onClick={() => onTabChange(tab.value)}
                          color={selectedTab === tab.value ? "blue" : "gray"}
                          variant="subtle"
                        >
                          {tab.value}
                        </Button>
                      ))}
                    </Button.Group>
                  </HoverCard.Dropdown>
                </HoverCard>
              )}
            />
          </Card>
        </DemoShell>
      </DemoContent>
    </Box>
  );
};

const snippetA = `
const [value, setValue] = useState<string | null>("0");
// ...
<OverflowTabs
  value={value}
  onTabChange={setValue}
  tabs={dummyArray.map((_, index) => ({
    value: \`\${index}\`,
    label: \`Tab \${index}\`,
    rightSection: index === 0 ? <IconBrandAmongus /> : undefined,
  }))}
/>
`;

const snippetB = `
<OverflowTabs
  tabs={dummyArray.map((_, index) => ({
    value: \`\${index}\`,
    label: \`Tab \${index}\`,
  }))}
  defaultValue="2"
/>
`;

const snippetC = `
<OverflowTabs
  tabs={dummyArray.map((_, index) => ({
    value: \`\${index}\`,
    label: \`Tab \${index}\`,
  }))}
  defaultValue="2"
  debounceWait={0}
  overflowBuffer={80}
  overflowComponent={(tabs, selectedTab, onTabChange) => (
    <HoverCard withinPortal>
      <HoverCard.Target>
        <Button compact variant="subtle">
          Show More
        </Button>
      </HoverCard.Target>

      <HoverCard.Dropdown>
        <Button.Group orientation="vertical">
          {tabs.map((tab) => (
            <Button
              key={tab.value}
              onClick={() => onTabChange(tab.value)}
              color={selectedTab === tab.value ? "blue" : "gray"}
              variant="subtle"
            >
              {tab.value}
            </Button>
          ))}
        </Button.Group>
      </HoverCard.Dropdown>
    </HoverCard>
  )}
/>
`;
