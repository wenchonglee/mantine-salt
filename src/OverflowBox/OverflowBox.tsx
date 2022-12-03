import { Box, Button, ButtonProps, createStyles, DefaultProps, Flex, Selectors } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { IconChevronDown, IconChevronUp } from "@tabler/icons";
import { ReactNode, useLayoutEffect, useMemo, useRef, useState } from "react";

type OverflowBoxStyleProps = {
  overflowState: {
    canOverflow: boolean;
    actualHeight: number;
  };
  isShowMore: boolean;
  defaultMaxHeight: number;
};

const useStyles = createStyles((_theme, { overflowState, isShowMore, defaultMaxHeight }: OverflowBoxStyleProps) => ({
  root: {},
  innerBox: {
    mask:
      isShowMore || !overflowState.canOverflow
        ? "unset"
        : "linear-gradient(to bottom, rgba(0,0,0,1) calc(100% - 40px), rgba(0,0,0,0))",
    maxHeight: isShowMore ? overflowState.actualHeight : defaultMaxHeight,
    transition: "max-height 250ms ease",
    overflow: "hidden",
  },
}));

type OverflowBoxStylesNames = Selectors<typeof useStyles>;

const DEBOUNCE_WAIT = 50;

interface OverflowBoxProps extends DefaultProps<OverflowBoxStylesNames, OverflowBoxStyleProps> {
  children: ReactNode;
  defaultMaxHeight: number;
  hasResizeObserver?: boolean;
  debounceWait?: number;
  overflowButton?: (isShowMore: boolean, toggle: () => void) => ReactNode;
  buttonProps?: ButtonProps;
}

export const OverflowBox = (props: OverflowBoxProps) => {
  const {
    className,
    classNames,
    styles,
    unstyled,
    defaultMaxHeight,
    children,
    hasResizeObserver = true,
    debounceWait = DEBOUNCE_WAIT,
    overflowButton,
    buttonProps,
    ...others
  } = props;

  const frameID = useRef(0);
  const ref = useRef<HTMLDivElement>(null);
  const [isShowMore, setIsShowMore] = useState(false);
  const [overflowState, setOverflowState] = useDebouncedState(
    {
      canOverflow: false,
      actualHeight: 10_000,
    },
    debounceWait,
    { leading: true }
  );

  const { classes, cx } = useStyles(
    { overflowState, isShowMore, defaultMaxHeight },
    {
      name: "OverflowBox",
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
            setOverflowState({
              canOverflow: ref.current.scrollHeight > ref.current.clientHeight,
              actualHeight: ref.current.scrollHeight,
            });
          }
        });
      }
    });
  }, []);

  useLayoutEffect(() => {
    if (ref.current) {
      setOverflowState({
        canOverflow: ref.current.scrollHeight > ref.current.clientHeight,
        actualHeight: ref.current.scrollHeight,
      });
      observer?.observe(ref.current);
    }

    return () => {
      observer?.disconnect();

      if (frameID.current) {
        cancelAnimationFrame(frameID.current);
      }
    };
  }, []);

  const toggle = () =>
    setIsShowMore((prev) => {
      // disconnect the observer if toggled to "show more" state
      if (!prev) {
        observer?.disconnect();
      } else {
        if (ref.current) observer?.observe(ref.current);
      }

      return !prev;
    });

  const renderOverflowButton = () => {
    if (isShowMore || (!isShowMore && overflowState.canOverflow)) {
      if (overflowButton) {
        return overflowButton(isShowMore, toggle);
      }

      return (
        <Flex justify="center">
          <Button
            rightIcon={isShowMore ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
            onClick={toggle}
            size="xs"
            variant="subtle"
            {...buttonProps}
          >
            {isShowMore ? "Show less" : "Show more"}
          </Button>
        </Flex>
      );
    }

    return null;
  };

  return (
    <Box className={cx(classes.root, className)} {...others}>
      <Box ref={ref} className={classes.innerBox}>
        {children}
      </Box>

      {renderOverflowButton()}
    </Box>
  );
};
