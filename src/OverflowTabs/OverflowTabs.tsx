import {
  Box,
  createStyles,
  DefaultProps,
  Menu,
  Selectors,
  TabProps,
  Tabs,
  TabsProps,
  UnstyledButton,
} from "@mantine/core";
import { useUncontrolled } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons";
import { debounce } from "lodash";
import { ReactNode, useLayoutEffect, useMemo, useRef, useState } from "react";

type OverflowTabsStylesProps = {
  isOverflownTabSelected: boolean;
};

const useStyles = createStyles((theme, { isOverflownTabSelected }: OverflowTabsStylesProps) => ({
  root: {
    width: "100%",
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
  tab: {},
  overflowTabContainer: {
    position: "absolute",
    right: 0,
    height: "100%",
  },
  overflowTab: {
    borderBottom: isOverflownTabSelected
      ? `2px solid ${theme.fn.variant({ variant: "filled", color: theme.primaryColor }).background}`
      : `2px solid transparent`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
    fontSize: theme.fontSizes.sm,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md / 2,
  },
}));

type OverflowTabsStylesNames = Selectors<typeof useStyles>;
type OverflowTab = Omit<TabProps, "children"> & { label: string };

interface OverflowTabsProps
  extends Omit<TabsProps, keyof DefaultProps | "orientation" | "children" | "variant">,
    DefaultProps<OverflowTabsStylesNames> {
  tabs: OverflowTab[];
  debounceWait?: number;
  overflowComponent?: (
    tabs: OverflowTab[],
    selectedTab: string | null,
    onTabChange: (tab: string | null) => void
  ) => ReactNode;
  overflowBuffer?: number;
}

const BUFFER = 24;
const DEBOUNCE_WAIT = 50;

export const OverflowTabs = (props: OverflowTabsProps) => {
  const {
    className,
    classNames,
    styles,
    unstyled,
    tabs,
    value,
    onTabChange,
    defaultValue,
    debounceWait = DEBOUNCE_WAIT,
    overflowComponent,
    overflowBuffer = BUFFER,
    ...others
  } = props;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const tRef = useRef<HTMLButtonElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const frameID = useRef<number>(0);
  const [overflownIndex, setOverflownIndex] = useState(Infinity);
  const [tabValue, setTabValue] = useUncontrolled({ value, onChange: onTabChange, defaultValue });

  const overflownTabs = tabs.slice(overflownIndex);
  const isOverflownTabSelected = overflownTabs.some((tab) => tab.value === tabValue);

  const { classes, cx } = useStyles(
    { isOverflownTabSelected },
    {
      name: "OverflowTabs",
      classNames,
      styles,
      unstyled,
    }
  );

  const findOverflownIndex = () => {
    if (wrapperRef.current && tabRefs.current) {
      let availableWidth = wrapperRef.current.clientWidth; // - overflowBuffer;

      if (tRef.current) {
        availableWidth -= tRef.current.clientWidth;
      } else {
        availableWidth -= overflowBuffer;
      }

      for (let i = 0; i < tabRefs.current.length; i++) {
        const tabRef = tabRefs.current[i];
        if (tabRef) {
          availableWidth -= tabRef.clientWidth;
          if (availableWidth <= 0) {
            setOverflownIndex(i);
            return;
          }
        }
      }
      setOverflownIndex(tabRefs.current.length);
    }
  };

  const debouncedFindOverflownIndex = debounce(findOverflownIndex, debounceWait, { leading: true });

  const handleTabChange = (value: string | null) => {
    setTimeout(() => findOverflownIndex(), 0);
    setTabValue(value);
  };

  const observer = useMemo(() => {
    if (typeof window === "undefined") {
      return null;
    }

    return new ResizeObserver((entries) => {
      const entry = entries[0];

      if (entry) {
        cancelAnimationFrame(frameID.current);

        frameID.current = requestAnimationFrame(() => {
          debouncedFindOverflownIndex();
        });
      }
    });
  }, []);

  useLayoutEffect(() => {
    debouncedFindOverflownIndex();
    if (wrapperRef.current) {
      observer?.observe(wrapperRef.current);
    }

    return () => {
      observer?.disconnect();

      if (frameID.current) {
        cancelAnimationFrame(frameID.current);
      }
    };
  }, []);

  const renderOverflow = () => {
    if (overflownIndex < tabs.length) {
      if (overflowComponent !== undefined) {
        return overflowComponent(overflownTabs, tabValue, handleTabChange);
      }
      const overflownTab = overflownTabs.find((tab) => tab.value === tabValue);

      return (
        <Menu withinPortal trigger="hover" position="bottom-end">
          <Menu.Target>
            <UnstyledButton className={classes.overflowTab} ref={tRef}>
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
                    tabValue === tab.value
                      ? theme.fn.variant({ variant: "light", color: theme.primaryColor }).background
                      : undefined,
                })}
                onClick={() => handleTabChange(tab.value)}
              >
                {tab.label}
              </Menu.Item>
            ))}
          </Menu.Dropdown>
        </Menu>
      );
    }

    return null;
  };

  return (
    <Tabs className={cx(classes.root, className)} {...others} value={tabValue} onTabChange={handleTabChange}>
      <div className={classes.wrapper} ref={wrapperRef}>
        <Tabs.List className={classes.tabsList}>
          {tabs.map((tab, index) => {
            const { label, ...otherTabProps } = tab;

            return (
              <Tabs.Tab
                key={index}
                ref={(element) => (tabRefs.current[index] = element)}
                sx={{ visibility: index >= overflownIndex ? "hidden" : "visible" }}
                className={classes.tab}
                {...otherTabProps}
              >
                {tab.label}
              </Tabs.Tab>
            );
          })}
        </Tabs.List>

        <Box className={classes.overflowTabContainer}>{renderOverflow()}</Box>
      </div>
    </Tabs>
  );
};
