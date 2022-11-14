import { Card, Code, Divider, Flex, SelectItem, Stack, Title } from "@mantine/core";
import { useState } from "react";
import { DemoShell } from "../core";
import { SearchMultiSelect } from "./SearchMultiSelect";

export const SearchMultiSelectDemo = () => {
  const [value, setValue] = useState<string[]>([]);
  const [res, setRes] = useState<SelectItem[]>([]);

  const search = async (query: string) => {
    const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
    const json = await res.json();
    const products = json.products as {
      id: number;
      title: string;
    }[];

    const selectItems = products.map((product) => ({
      value: product.id.toString(),
      label: product.title,
    }));

    setRes(selectItems); // this is purely for debugging purposes

    return selectItems;
  };

  return (
    <Stack>
      <Flex justify="space-between">
        <Title color="red" order={2}>
          Work in progress
        </Title>
        <DemoShell.Source
          componentLink="https://github.com/wenchonglee/mantine-salt/blob/main/src/SearchMultiSelect/SearchMultiSelect.tsx"
          demoLink="https://github.com/wenchonglee/mantine-salt/blob/main/src/SearchMultiSelect/SearchMultiSelectDemo.tsx"
        />
      </Flex>

      <DemoShell header="Experimental">
        <Card w="400px" h="400px">
          <Divider m="md" label="stored value" />
          <Code block>{JSON.stringify(value)}</Code>

          <Divider m="md" label="search response" />
          <Code block>{JSON.stringify(res)}</Code>

          <Divider m="md" />
          <SearchMultiSelect state={value} setState={setValue} search={search} />
        </Card>
      </DemoShell>
    </Stack>
  );
};
