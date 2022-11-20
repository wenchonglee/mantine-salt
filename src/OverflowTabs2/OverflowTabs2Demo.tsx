import { Card, CSSObject, Flex, Stack } from "@mantine/core";
import { useState } from "react";
import { DemoShell } from "../core";
import { OverflowTabs2 } from "./OverflowTabs2";

const cardStyles: CSSObject = {
  width: "600px",
  resize: "horizontal",
};

const dummyArray = new Array(10).fill(undefined);

export const OverflowTabs2Demo = () => {
  const [value, setValue] = useState<string | null>("0");

  return (
    <Stack>
      <Flex justify="flex-end">
        <DemoShell.Source
          componentLink="https://github.com/wenchonglee/mantine-salt/blob/main/src/OverflowTabs2/OverflowTabs2.tsx"
          demoLink="https://github.com/wenchonglee/mantine-salt/blob/main/src/OverflowTabs2/OverflowTabs2Demo.tsx"
        />
      </Flex>

      <DemoShell
        header="Default"
        description="Has a resize observer to update TabsList overflow state. 
        When overflown, a menu is rendered to the end"
      >
        <Card withBorder sx={cardStyles}>
          <OverflowTabs2
            value={value}
            onTabChange={setValue}
            tabs={dummyArray.map((_, index) => ({
              value: `${index}`,
              label: `Tab ${index}`,
              rightSection: "test!",
            }))}
          />
        </Card>
      </DemoShell>

      <DemoShell header="Uncontrolled, without bounding box">
        <OverflowTabs2
          tabs={dummyArray.map((_, index) => ({
            value: `${index}`,
            label: `Tab ${index}`,
          }))}
          defaultValue="2"
        />
      </DemoShell>
    </Stack>
  );
};
