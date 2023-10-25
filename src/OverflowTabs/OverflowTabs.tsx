import { Box, DefaultProps, TabProps, Tabs, TabsProps } from "@mantine/core";
import { useUncontrolled } from "@mantine/hooks";
import { debounce } from "lodash";
import { ReactNode, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { OverflowMenu, OverflowMenuProps } from "./OverflowMenu/OverflowMenu";
import { OverflowTabsStylesNames, useStyles } from "./OverflowTabs.styles";

type OverflowTab = Omit<TabProps, "children"> & { label: string };

interface OverflowTabsProps
  extends Omit<TabsProps, keyof DefaultProps | "orientation" | "children" | "variant">,
    DefaultProps<OverflowTabsStylesNames> {
  /** Equivalent to Mantine Tabs.Tab component */
  tabs: OverflowTab[];

  /** Wait time for calculating overflow, default is 50 */
  debounceWait?: number;

  /** Render a custom overflow component */
  overflowComponent?: (props: OverflowMenuProps) => ReactNode;
}

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
    ...others
  } = props;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const overflowMenuRef = useRef<HTMLButtonElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const frameID = useRef<number>(0);
  const [overflownIndex, setOverflownIndex] = useState(Infinity);
  const [selectedTab, setSelectedTab] = useUncontrolled({ value, onChange: onTabChange, defaultValue });
  const [right, setRight] = useState(0);

  const { classes, cx } = useStyles(undefined, {
    name: "OverflowTabs",
    classNames,
    styles,
    unstyled,
  });

  const findOverflownIndex = () => {
    if (wrapperRef.current && tabRefs.current) {
      let availableWidth = wrapperRef.current.clientWidth;
      if (overflowMenuRef.current) {
        availableWidth -= overflowMenuRef.current.clientWidth;
      }
      let nextWidth = 0;

      for (let i = 0; i < tabRefs.current.length; i++) {
        const tabRef = tabRefs.current[i];
        if (tabRef) {
          nextWidth += tabRef.clientWidth;
          availableWidth -= tabRef.clientWidth;
          if (availableWidth <= 0) {
            setOverflownIndex(i);
            setRight(nextWidth - tabRef.clientWidth);
            return;
          }
        }
      }
      setRight(0);
      setOverflownIndex(tabRefs.current.length);
    }
  };

  const debouncedFindOverflownIndex = debounce(findOverflownIndex, debounceWait, { leading: true });

  useEffect(() => {
    findOverflownIndex();
  }, [selectedTab]);

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
      const overflownTabs = tabs.slice(overflownIndex);

      if (overflowComponent !== undefined) {
        return overflowComponent({ selectedTab, setSelectedTab, overflownTabs, overflowMenuRef });
      }

      return (
        <OverflowMenu
          setSelectedTab={setSelectedTab}
          selectedTab={selectedTab}
          overflownTabs={overflownTabs}
          overflowMenuRef={overflowMenuRef}
        />
      );
    }

    return null;
  };

  return (
    <Box className={cx(classes.root, className)}>
      <Tabs className={classes.tabs} {...others} value={selectedTab} onTabChange={setSelectedTab}>
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

          <Box
            className={classes.overflowTabContainer}
            sx={{
              left: right,
            }}
          >
            {renderOverflow()}
          </Box>
        </div>
      </Tabs>
    </Box>
  );
};
