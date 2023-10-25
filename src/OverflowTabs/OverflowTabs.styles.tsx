import { createStyles, Selectors } from "@mantine/core";

export const useStyles = createStyles((_theme) => ({
  root: {
    flexGrow: 1,
    /** necessary if the parent is a flexbox */
    minWidth: 0,
  },
  wrapper: {
    display: "flex",
    position: "relative",
    overflow: "hidden",
    width: "100%",
  },
  tabsList: {
    flexWrap: "unset",
    flexGrow: 1,
    justifyContent: "center",
  },
  tabs: {},
  tab: {},
  overflowTabContainer: {
    position: "absolute",
    // right: 0,
    height: "100%",
  },
}));

export type OverflowTabsStylesNames = Selectors<typeof useStyles>;
