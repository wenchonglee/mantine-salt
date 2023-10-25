import { Box, Menu, TabsTabProps, UnstyledButton } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { RefObject } from "react";
import * as classes from "./overflowMenu.module.css";
import clsx from "clsx";

type OverflowTab = Omit<TabsTabProps, "children"> & { label: string };

export type OverflowMenuProps = {
  overflownTabs: OverflowTab[];
  selectedTab: string | null;
  setSelectedTab: (tab: string | null) => void;
  /** Pass this ref to the container of the overflow component, this is for calculating how much space this tab holds */
  overflowMenuRef: RefObject<HTMLButtonElement>;
};

export const OverflowMenu = (props: OverflowMenuProps) => {
  const { overflownTabs, setSelectedTab, overflowMenuRef, selectedTab } = props;
  const isOverflownTabSelected = overflownTabs.some((tab) => tab.value === selectedTab);
  const overflownTab = overflownTabs.find((tab) => tab.value === selectedTab);

  return (
    <Menu withinPortal trigger="hover" position="bottom-end">
      <Menu.Target>
        <UnstyledButton
          className={clsx(classes.menuButton, {
            [classes.selected]: isOverflownTabSelected,
          })}
          ref={overflowMenuRef}
        >
          <Box>{overflownTab ? overflownTab.label : `+ ${overflownTabs.length}`}</Box>
          &nbsp;
          <IconChevronDown size={16} />
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        {overflownTabs.map((tab, index) => (
          <Menu.Item
            key={index}
            className={clsx({
              [classes.active]: selectedTab === tab.value,
            })}
            leftSection={tab.leftSection}
            onClick={() => setSelectedTab(tab.value)}
          >
            {tab.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};
