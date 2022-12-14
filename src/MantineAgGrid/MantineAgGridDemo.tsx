import { Box, Card, CSSObject, Group, Text, Title } from "@mantine/core";
import { DemoContent, DemoHeader, DemoShell, Source } from "../core";
import { ProgressHoverCard } from "../core/ProgressBadge";
import { MantineAgGrid } from "./MantineAgGrid";

const cardStyles: CSSObject = {
  width: "100%",
  resize: "horizontal",
};

export const MantineAgGridDemo = () => {
  return (
    <Box>
      <DemoHeader>
        <Box>
          <ProgressHoverCard stage="0" />
        </Box>

        <Group position="apart" align="flex-end">
          <Title>Mantine Themed Ag Grid</Title>

          <Source
            componentLink="https://github.com/wenchonglee/mantine-salt/blob/main/src/MantineAgGrid/MantineAgGrid.tsx"
            demoLink="https://github.com/wenchonglee/mantine-salt/blob/main/src/MantineAgGrid/MantineAgGridDemo.tsx"
          />
        </Group>

        <Text>
          May not be pursued.
          <br />
          Ag Grid can reference mantine styles via <code>Global Styles</code>, but the tricky part is converting icons
        </Text>
      </DemoHeader>

      <DemoContent>
        <DemoShell
          header="Default"
          // description="Has a resize observer to update TabsList overflow state.
          // When overflown, left/right buttons are rendered (tabs can be also be scrolled by mouse wheel or swipe gesture"
        >
          <Card sx={cardStyles}>
            <MantineAgGrid />
          </Card>
        </DemoShell>
      </DemoContent>
    </Box>
  );
};
