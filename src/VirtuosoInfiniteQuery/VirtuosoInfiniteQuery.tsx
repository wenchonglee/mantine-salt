import { Box, Card, Code, ScrollArea, Skeleton, Space, Stack, Text } from "@mantine/core";
import { useState } from "react";
import { Virtuoso } from "react-virtuoso";
import { useMockInfiniteQuery } from "./mock";

// referenced https://github.com/grumd/osu-pps/blob/develop/ui/src/features/maps/components/ScrolledFilteredMaps.tsx
export const VirtuosoInfiniteQuery = () => {
  const { status, data, isFetching, fetchNextPage, hasNextPage } = useMockInfiniteQuery();
  const [scrollParent, setScrollParent] = useState<HTMLDivElement | null>(null);

  return (
    <Box w="100%">
      <Code block>
        isFetching: {isFetching.toString()} <br />
        hasNextPage: {hasNextPage?.toString()} <br />
        {data?.pages.map((page) => page.data).flat().length ?? 0}
      </Code>

      <Space h="xl" />

      {status === "pending" ? (
        <Stack gap="xs">
          <Skeleton height="16px" w="100%" />
          <Skeleton height="16px" w="100%" />
          <Skeleton height="16px" w="80%" />
        </Stack>
      ) : status === "error" ? (
        <Text color="red"> Error </Text>
      ) : (
        <ScrollArea
          style={{
            height: "300px",
          }}
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
                  <Stack gap="xs">
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
