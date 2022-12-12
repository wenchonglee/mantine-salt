import { Box, Card, Code, Divider, Group, SelectItem, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { useState } from "react";
import { DemoContent, DemoHeader, DemoShell, Source } from "../core";
import { ProgressHoverCard } from "../core/ProgressBadge";
import { SearchMultiSelect } from "./SearchMultiSelect";

export const SearchMultiSelectDemo = () => {
  const [value, setValue] = useState<string[]>(["1"]);
  const [response, setResponse] = useState<SelectItem[]>([]);

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

    setResponse(selectItems); // this is purely for debugging purposes

    return selectItems;
  };

  return (
    <Box>
      <DemoHeader>
        <Box>
          <ProgressHoverCard stage="1" />
        </Box>

        <Group position="apart" align="flex-end">
          <Title>Search Multi Select</Title>

          <Source
            componentLink="https://github.com/wenchonglee/mantine-salt/blob/main/src/SearchMultiSelect/SearchMultiSelect.tsx"
            demoLink="https://github.com/wenchonglee/mantine-salt/blob/main/src/SearchMultiSelect/SearchMultiSelectDemo.tsx"
          />
        </Group>

        <Text>
          This component was written for scenarios where the data for <Code>MultiSelect</Code> is dynamic.
          <br /> As of version Mantine version 5.8.2, this is a necessary workaround because the base component doesn't
          handle it well.
        </Text>
      </DemoHeader>

      <DemoContent>
        <DemoShell header="Experimental & Work in Progress" snippet={snippetA}>
          <Card w="100%">
            <SimpleGrid cols={2}>
              <SearchMultiSelect
                label="SearchMultiSelect"
                state={value}
                setState={setValue}
                search={search}
                defaultData={[
                  {
                    value: "1",
                    label: "iphone 9",
                  },
                ]}
                creatable
                getCreateLabel={(query) => `+ Create ${query}`}
                // onCreate={(query) => {
                //   const item = { value: query, label: query };
                //   setData((current) => [...current, item]);
                //   return item;
                // }}
              />
              <Stack>
                <Divider label="stored value" />
                <Code block>{JSON.stringify(value)}</Code>

                <Divider label="search response" />
                <Code block>{JSON.stringify(response)}</Code>
              </Stack>
            </SimpleGrid>
          </Card>
        </DemoShell>
      </DemoContent>
    </Box>
  );
};

const snippetA = `
const [value, setValue] = useState<string[]>(["1"]);

const search = async (query: string) => {
  const res = await fetch(\`https://dummyjson.com/products/search?q=\${query}\`);
  const json = await res.json();
  const products = json.products as {
    id: number;
    title: string;
  }[];

  const selectItems = products.map((product) => ({
    value: product.id.toString(),
    label: product.title,
  }));

  return selectItems;
};

//...

<SearchMultiSelect
  state={value}
  setState={setValue}
  search={search}
  defaultData={[
    {
      value: "1",
      label: "iphone 9",
    },
  ]}
  creatable
  getCreateLabel={(query) => \`+ Create \${query}\`}
/>
`;
