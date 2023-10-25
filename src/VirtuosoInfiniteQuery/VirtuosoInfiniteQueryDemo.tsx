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

        <Group justify="apart" align="flex-end">
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
          snippet={snippetA}
        >
          <VirtuosoInfiniteQuery />
        </DemoShell>
      </DemoContent>
    </Box>
  );
};

const snippetA = `
const VirtuosoInfiniteQuery = () => {
  const { status, data, isFetching, fetchNextPage, hasNextPage } = useMockInfiniteQuery();
  const [scrollParent, setScrollParent] = useState<HTMLDivElement | null>(null);

  return (
    <Box w="100%">
      {/* redacted */}

      {status === "loading" ? (
        <Stack spacing="xs">
          <Skeleton height="16px" w="100%" />
          <Skeleton height="16px" w="100%" />
          <Skeleton height="16px" w="80%" />
        </Stack>
      ) : status === "error" ? (
        <Text color="red"> Error </Text>
      ) : (
        <ScrollArea
          sx={{ height: "300px" }}
          viewportRef={setScrollParent}
        >
          <Virtuoso
            customScrollParent={scrollParent ?? undefined}
            data={data?.pages.map((page) => page.data).flat()}
            endReached={() => {
              if (hasNextPage) {
                fetchNextPage();
              }
            }}
            overscan={1000}
            components={{
              Footer: () =>
                hasNextPage ? (
                  <Stack spacing="xs">
                    <Skeleton height="16px" w="100%" />
                    <Skeleton height="16px" w="100%" />
                    <Skeleton height="16px" w="80%" />
                  </Stack>
                ) : (
                  <Text>No more results</Text>
                ),
            }}
            itemContent={(index, user) => {
              return (
                <Card withBorder mb="md">
                  <Text>
                    {user.name}
                    <br />
                    {user.text}
                    {index % 2 ? (
                      <>
                        <br /> random block
                      </>
                    ) : null}
                  </Text>
                </Card>
              );
            }}
          />
        </ScrollArea>
      )}
    </Box>
  );
};
`;
