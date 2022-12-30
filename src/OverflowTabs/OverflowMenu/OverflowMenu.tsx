import { Box, Menu, TabProps, UnstyledButton } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons";
import { RefObject } from "react";
import { useStyles } from "./OverflowMenu.styles";

type OverflowTab = Omit<TabProps, "children"> & { label: string };

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

  const { classes } = useStyles({
    isOverflownTabSelected,
  });

  return (
    <Menu withinPortal trigger="hover" position="bottom-end">
      <Menu.Target>
        <UnstyledButton className={classes.menuButton} ref={overflowMenuRef}>
          <Box>{overflownTab ? overflownTab.label : `+ ${overflownTabs.length}`}</Box>
          &nbsp;
          <IconChevronDown size={16} />
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        {overflownTabs.map((tab, index) => (
          <Menu.Item
            key={index}
            sx={(theme) => ({
              backgroundColor:
                selectedTab === tab.value
                  ? theme.fn.variant({ variant: "light", color: theme.primaryColor }).background
                  : undefined,
            })}
            icon={tab.icon}
            onClick={() => setSelectedTab(tab.value)}
          >
            {tab.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};
