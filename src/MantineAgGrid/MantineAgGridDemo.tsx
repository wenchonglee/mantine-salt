import { Card, CSSObject, Flex, Stack, Title } from "@mantine/core";
import { DemoShell } from "../core";
import { MantineAgGrid } from "./MantineAgGrid";

const cardStyles: CSSObject = {
  width: "100%",
  resize: "horizontal",
};

export const MantineAgGridDemo = () => {
  return (
    <Stack>
      <Flex justify="space-between">
        <Title color="red" order={2}>
          Work in progress
        </Title>
        <DemoShell.Source
          componentLink="https://github.com/wenchonglee/mantine-salt/blob/main/src/MantineAgGrid/MantineAgGrid.tsx"
          demoLink="https://github.com/wenchonglee/mantine-salt/blob/main/src/MantineAgGrid/MantineAgGridDemo.tsx"
        />
      </Flex>

      <DemoShell
        header="Default"
        // description="Has a resize observer to update TabsList overflow state.
        // When overflown, left/right buttons are rendered (tabs can be also be scrolled by mouse wheel or swipe gesture"
      >
        <Card sx={cardStyles}>
          <MantineAgGrid />
        </Card>
      </DemoShell>
    </Stack>
  );
};
