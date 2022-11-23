import { ActionIcon, Box, createStyles, DefaultProps, Menu, Selectors, TabProps, Tabs, TabsProps } from "@mantine/core";
import { useUncontrolled } from "@mantine/hooks";
import { IconDotsVertical } from "@tabler/icons";
import { debounce } from "lodash";
import { ReactNode, useLayoutEffect, useMemo, useRef, useState } from "react";

const useStyles = createStyles((theme) => ({
  root: {
    overflow: "auto",
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
  },
  tab: {},
  buttonContainer: {
    position: "absolute",
    right: 0,
    top: "50%",
    transform: "translate(0%, -50%)",
  },
}));

type OverflowTabsStylesNames = Selectors<typeof useStyles>;
type OverflowTab = Omit<TabProps, "children"> & { label: string };

interface OverflowTabsProps
  extends Omit<TabsProps, keyof DefaultProps | "orientation" | "children">,
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

  const { classes, cx } = useStyles(undefined, {
    name: "OverflowTabs",
    classNames,
    styles,
    unstyled,
  });

  const wrapperRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const frameID = useRef<number>(0);
  const [overflownIndex, setOverflownIndex] = useState(Infinity);
  const [tabValue, handleTabChange] = useUncontrolled({ value, onChange: onTabChange, defaultValue });

  const observer = useMemo(() => {
    if (typeof window === "undefined") {
      return null;
    }

    return new ResizeObserver((entries) => {
      const entry = entries[0];

      if (entry) {
        cancelAnimationFrame(frameID.current);

        frameID.current = requestAnimationFrame(() => {
          findOverflownIndex();
        });
      }
    });
  }, []);

  useLayoutEffect(() => {
    findOverflownIndex();
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

  const findOverflownIndex = debounce(
    () => {
      if (wrapperRef.current && tabRefs.current) {
        let availableWidth = wrapperRef.current.clientWidth - overflowBuffer;

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
    },
    debounceWait,
    { leading: true }
  );

  const renderOverflow = () => {
    if (overflownIndex < tabs.length) {
      if (overflowComponent !== undefined) {
        return overflowComponent(tabs.slice(overflownIndex), tabValue, handleTabChange);
      }

      return (
        <Menu withinPortal trigger="hover" position="bottom-end">
          <Menu.Target>
            <ActionIcon color="gray">
              <IconDotsVertical />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            {tabs.slice(overflownIndex).map((tab, index) => (
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

        <Box className={classes.buttonContainer}>{renderOverflow()}</Box>
      </div>
    </Tabs>
  );
};
