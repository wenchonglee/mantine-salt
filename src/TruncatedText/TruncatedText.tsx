import { Anchor, Box, createStyles, DefaultProps, Selectors, Text } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { useLayoutEffect, useMemo, useRef, useState } from "react";

type AnchorProps = {
  isDisplayed: boolean;
};

const useStyles = createStyles((_theme, { isDisplayed }: AnchorProps) => ({
  root: {},
  text: {
    whiteSpace: "pre-wrap",
  },
  anchor: {
    display: isDisplayed ? "unset" : "none",
    padding: 0,
  },
}));

type TruncatedTextStylesNames = Selectors<typeof useStyles>;

interface TruncatedTextProps extends DefaultProps<TruncatedTextStylesNames, AnchorProps> {
  text: string;
  lineClamp: number;
  hasResizeObserver?: boolean;
}

export const TruncatedText = (props: TruncatedTextProps) => {
  const { className, classNames, styles, unstyled, lineClamp, text, hasResizeObserver = true, ...others } = props;

  const frameID = useRef(0);
  const ref = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useDebouncedState(false, 200, { leading: true });
  const [isCollapsed, setIsCollapsed] = useState(false);

  const { classes, cx } = useStyles(
    { isDisplayed: isOverflowing && !isCollapsed },
    {
      name: "TruncatedText",
      classNames,
      styles,
      unstyled,
    }
  );

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
            setIsOverflowing(ref.current.scrollHeight > ref.current.clientHeight);
          }
        });
      }
    });
  }, []);

  useLayoutEffect(() => {
    if (ref.current) {
      setIsOverflowing(ref.current.scrollHeight > ref.current.clientHeight);
      observer?.observe(ref.current);
    }

    return () => {
      observer?.disconnect();

      if (frameID.current) {
        cancelAnimationFrame(frameID.current);
      }
    };
  }, []);

  const handleShowMore = () => {
    setIsCollapsed(true);
    observer?.disconnect();
  };

  return (
    <Box className={cx(classes.root, className)} {...others}>
      <Text ref={ref} lineClamp={isCollapsed ? undefined : lineClamp} className={classes.text}>
        {text}
      </Text>

      <Anchor component="button" className={classes.anchor} onClick={handleShowMore} size="sm">
        Show more
      </Anchor>
    </Box>
  );
};
