import { Loader, MultiSelect, SelectItem } from "@mantine/core";
import { debounce } from "lodash";
import { Dispatch, SetStateAction, useState } from "react";

type SearchMultiSelectProps = {
  state: string[];
  setState: Dispatch<SetStateAction<string[]>>;
  search(query: string): Promise<SelectItem[]>;
};

export const SearchMultiSelect = (props: SearchMultiSelectProps) => {
  const { state, setState, search } = props;
  const [data, setData] = useState<SelectItem[]>([]);
  // const [searchValue, setSearchValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const [selectedData, setSelectedData] = useState<SelectItem[]>([]);

  const fullData = [...data, ...selectedData];

  const handleSearchChange = debounce(async (query) => {
    if (query === "") {
      return;
    }
    setIsLoading(true);
    const res = await search(query);
    setIsLoading(false);

    setData(res);
  }, 200);

  return (
    <MultiSelect
      data={fullData}
      filter={(_, selected) => {
        if (selected) return false;
        // don't filter, let the search api do its job
        return true;
      }}
      onSearchChange={handleSearchChange}
      // searchValue={searchValue}
      onChange={(newValue) => {
        if (newValue.length < state.length) {
          const difference = state.filter((x) => !newValue.includes(x));
          setSelectedData((prev) => prev.filter((v) => !difference.includes(v.value)));
        } else {
          const selectedItems = data.filter((d) => newValue.includes(d.value));
          setSelectedData((prev) => [...prev, ...selectedItems]);
        }
        setState(newValue);
      }}
      value={state}
      searchable
      rightSection={isLoading ? <Loader size={14} /> : null}
    />
  );
};
