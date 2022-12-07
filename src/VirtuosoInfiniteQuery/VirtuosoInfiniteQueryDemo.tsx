import { Box, Group, Text, Title } from "@mantine/core";
import { DemoContent, DemoHeader, DemoShell, Source } from "../core";
import { ProgressHoverCard } from "../core/ProgressBadge";
import { VirtuosoInfiniteQuery } from "./VirtuosoInfiniteQuery";

export const VirtuosoInfiniteQueryDemo = () => {
  return (
    <Box>
      <DemoHeader>
        <Box>
          <ProgressHoverCard stage="1" />
        </Box>

        <Group position="apart" align="flex-end">
          <Title>React Virtuoso + React Query </Title>

          <Source
            componentLink="https://github.com/wenchonglee/mantine-salt/blob/main/src/VirtuosoInfiniteQuery/VirtuosoInfiniteQuery.tsx"
            demoLink="https://github.com/wenchonglee/mantine-salt/blob/main/src/VirtuosoInfiniteQuery/VirtuosoInfiniteQueryDemo.tsx"
          />
        </Group>

        <Text>
          This is an example of using <code>react-virtuoso</code>, <code>react-query</code>, and <code>ScrollArea</code>
          <br />
        </Text>
      </DemoHeader>

      <DemoContent>
        <Title order={2}>Usage</Title>

        <DemoShell
          header="Example"
          description={
            <>
              Virtuoso uses <code>customScrollParent</code> to work with <code>ScrollArea</code>
            </>
          }
        >
          <VirtuosoInfiniteQuery />
        </DemoShell>
      </DemoContent>
    </Box>
  );
};
