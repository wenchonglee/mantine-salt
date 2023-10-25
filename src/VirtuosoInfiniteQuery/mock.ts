import { useInfiniteQuery } from "@tanstack/react-query";

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const mockApiCall = async (cursor: number) => {
  const pageSize = 15;

  const data = Array(pageSize)
    .fill(0)
    .map((_, i) => {
      return {
        name: "Example " + (i + cursor),
        id: i + cursor,
        text: "a".repeat(i + cursor),
      };
    });

  const nextId = cursor < 30 ? data[data.length - 1].id + 1 : null;
  const previousId = cursor > -30 ? data[0].id - pageSize : null;
  await sleep(1000);

  return { data, nextId, previousId };
};

export const useMockInfiniteQuery = () =>
  useInfiniteQuery({
    queryKey: ["demo"],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const res = await mockApiCall(pageParam);
      return res;
    },
    getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
  });
