import { ActionIcon, Box, createStyles, DefaultProps, Menu, Selectors, TabProps, Tabs, TabsProps } from "@mantine/core";
import { useDebouncedState, useUncontrolled } from "@mantine/hooks";
import { IconDotsVertical } from "@tabler/icons";
import { useLayoutEffect, useMemo, useRef } from "react";

const useStyles = createStyles((theme) => ({
  root: {
    overflow: "auto",
    width: "100%",
  },
  wrapper: {
    position: "relative",
    width: "100%",
    overflow: "hidden",
    display: "flex",
    "::-webkit-scrollbar": {
      display: "none",
    },
    "& .mantine-Tabs-tabsList": {
      flexWrap: "unset",
    },
  },
  buttonContainer: {
    position: "absolute",
    right: 0,
    top: "50%",
    margin: "auto",
    transform: "translate(-50%, -50%)",
  },
}));

type OverflowTabsStylesNames = Selectors<typeof useStyles>;

interface OverflowTabsProps
  extends Omit<TabsProps, keyof DefaultProps | "orientation" | "children">,
    DefaultProps<OverflowTabsStylesNames> {
  tabs: (Omit<TabProps, "children"> & { label: string })[];
}

const BUFFER = 24;

export const OverflowTabs = (props: OverflowTabsProps) => {
  const { tabs, value, onTabChange, defaultValue, ...others } = props;
  const { classes } = useStyles();
  const allRef = useRef<(HTMLButtonElement | null)[]>([]);

  const frameID = useRef<number>(0);
  const ref = useRef<HTMLDivElement>(null);
  const [overflownIndex, setOverflownIndex] = useDebouncedState(Infinity, 50, { leading: true });
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
    if (ref.current) {
      observer?.observe(ref.current);
    }

    return () => {
      observer?.disconnect();

      if (frameID.current) {
        cancelAnimationFrame(frameID.current);
      }
    };
  }, []);

  const findOverflownIndex = () => {
    if (ref.current && allRef.current) {
      let availableWidth = ref.current.clientWidth - BUFFER;

      for (let i = 0; i < allRef.current.length; i++) {
        const tabRef = allRef.current[i];
        if (tabRef) {
          availableWidth -= tabRef.clientWidth;
          if (availableWidth <= 0) {
            setOverflownIndex(i);
            return;
          }
        }
      }
      setOverflownIndex(allRef.current.length);
    }
  };

  return (
    <Tabs className={classes.root} {...others} value={tabValue} onTabChange={handleTabChange}>
      <div className={classes.wrapper} ref={ref}>
        <Tabs.List>
          {tabs.map((tab, index) => {
            const { label, ...otherTabProps } = tab;

            return (
              <Tabs.Tab
                key={index}
                ref={(element) => (allRef.current[index] = element)}
                style={{ visibility: index >= overflownIndex ? "hidden" : "visible" }}
                {...otherTabProps}
              >
                {tab.label}
              </Tabs.Tab>
            );
          })}
        </Tabs.List>

        <Box className={classes.buttonContainer}>
          {overflownIndex < tabs.length && (
            <Menu withinPortal trigger="hover">
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
                        value === tab.value
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
          )}
        </Box>
      </div>
    </Tabs>
  );
};
