import { ActionIcon, createStyles, DefaultProps, Group, Selectors, Tabs, TabsProps } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons";
import { Children, isValidElement, ReactNode, useLayoutEffect, useMemo, useRef } from "react";

const useStyles = createStyles((theme) => ({
  root: {
    overflow: "auto",
    width: "100%",
  },
  leftButton: {},
  rightButton: {},
  wrapper: {
    position: "relative",
    width: "100%",
    overflow: "auto",
    display: "flex",
    "::-webkit-scrollbar": {
      display: "none",
    },
    "& .mantine-Tabs-tabsList": {
      flexWrap: "unset",
    },
  },
}));

type ScrollableTabsStylesNames = Selectors<typeof useStyles>;

interface ScrollableTabsProps
  extends Omit<TabsProps, keyof DefaultProps | "orientation">,
    DefaultProps<ScrollableTabsStylesNames> {
  hasResizeObserver?: boolean;
  children: ReactNode;
}

export const ScrollableTabs = (props: ScrollableTabsProps) => {
  const { hasResizeObserver = true, children, ...others } = props;
  const { classes } = useStyles();

  const frameID = useRef<number>(0);
  const ref = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useDebouncedState(false, 200, { leading: true });

  const newChildren = useMemo(() => {
    return Children.map(children, (child) => {
      if (isValidElement(child) && child.type === Tabs.List) {
        return (
          <Group noWrap align="center">
            {isOverflowing && (
              <ActionIcon className={classes.leftButton} onClick={() => scroll("left")} size="xs" variant="transparent">
                <IconChevronLeft />
              </ActionIcon>
            )}

            <div className={classes.wrapper} ref={ref}>
              {child}
            </div>

            {isOverflowing && (
              <ActionIcon
                className={classes.rightButton}
                onClick={() => scroll("right")}
                size="xs"
                variant="transparent"
              >
                <IconChevronRight />
              </ActionIcon>
            )}
          </Group>
        );
      }
      return child;
    });
  }, [isOverflowing]);

  const observer = useMemo(() => {
    if (!hasResizeObserver || typeof window === "undefined") {
      return null;
    }

    return new ResizeObserver((entries) => {
      const entry = entries[0];

      if (entry) {
        cancelAnimationFrame(frameID.current);

        frameID.current = requestAnimationFrame(() => {
          if (ref.current) {
            setIsOverflowing(ref.current.scrollWidth > ref.current.clientWidth);
          }
        });
      }
    });
  }, []);

  useLayoutEffect(() => {
    if (ref.current) {
      setIsOverflowing(ref.current.scrollWidth > ref.current.clientWidth);
      observer?.observe(ref.current);
    }

    return () => {
      observer?.disconnect();

      if (frameID.current) {
        cancelAnimationFrame(frameID.current);
      }
    };
  }, []);

  const scroll = (dir: "left" | "right") => {
    if (ref.current) {
      const left =
        dir === "left"
          ? ref.current.scrollLeft - ref.current.clientWidth
          : ref.current.scrollLeft + ref.current.clientWidth;
      ref.current.scrollTo({ left, behavior: "smooth" });
    }
  };

  return (
    <Tabs className={classes.root} {...others}>
      {newChildren}
    </Tabs>
  );
};
