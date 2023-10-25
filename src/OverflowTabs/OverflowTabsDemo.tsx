import { Anchor, Box, Button, Card, Code, MantineStyleProp, Group, HoverCard, List, Text, Title } from "@mantine/core";
import { IconBrandAmongUs } from "@tabler/icons-react";
import { useState } from "react";
import { DemoContent, DemoHeader, DemoShell, Source } from "../core";
import { ProgressHoverCard } from "../core/ProgressBadge";
import { OverflowTabs } from "./OverflowTabs";

const cardStyles: MantineStyleProp = {
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

        <Group justify="apart" align="flex-end">
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
          <Card withBorder style={cardStyles}>
            <OverflowTabs
              value={value}
              onChange={setValue}
              tabs={dummyArray.map((_, index) => ({
                value: `${index}`,
                label: `Tab ${index === 7 ? "longer text-longer text-longer text" : index}`,
                icon: !(index % 8) ? <IconBrandAmongUs /> : undefined,
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
          <Card withBorder style={cardStyles}>
            <OverflowTabs
              value={value}
              onChange={setValue}
              tabs={dummyArray.map((_, index) => ({
                value: `${index}`,
                label: `Tab ${index}`,
              }))}
              defaultValue="2"
              debounceWait={0}
              overflowComponent={({ overflownTabs, selectedTab, setSelectedTab, overflowMenuRef }) => (
                <HoverCard withinPortal>
                  <HoverCard.Target>
                    <Button size="compact-sm" variant="subtle" ref={overflowMenuRef}>
                      Show More
                    </Button>
                  </HoverCard.Target>

                  <HoverCard.Dropdown>
                    <Button.Group orientation="vertical">
                      {overflownTabs.map((tab) => (
                        <Button
                          key={tab.value}
                          onClick={() => setSelectedTab(tab.value)}
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
        {/* 
        <DemoShell
          header="Grid/Flex parents"
          description="When the parent element is a flex or grid, you will need to add min-width: 0"
        >
          <Card w="500px" withBorder sx={cardStyles}>
            <Text italic size="xs">
              without <code>min-width: 0</code>, doesn't work correctly
            </Text>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "10px",
                gridAutoRows: "minmax(100px, auto)",
              }}
            >
              <Box sx={{ gridColumn: "2 / 4", gridRow: "1 / 3" }}>testb</Box>
              <OverflowTabs
                value={value}
                onTabChange={setValue}
                tabs={dummyArray.map((_, index) => ({
                  value: `${index}`,
                  label: `Tab ${index === 7 ? "longer text-longer text-longer text" : index}`,
                }))}
              />
              <Box sx={{ gridColumn: "1 / 3", gridRow: "1 / 2" }}>test</Box>
            </Box>
            <Divider my="md" mx="-md" />

            <Text italic size="xs">
              with <code>min-width: 0</code>
            </Text>
            <Flex>
              <OverflowTabs
                value={value}
                onTabChange={setValue}
                tabs={dummyArray.map((_, index) => ({
                  value: `${index}`,
                  label: `Tab ${index === 7 ? "longer text-longer text-longer text" : index}`,
                }))}
              />
            </Flex>
          </Card>
        </DemoShell> */}
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
