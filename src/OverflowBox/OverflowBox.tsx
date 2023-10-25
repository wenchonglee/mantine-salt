import { Box, Button, ButtonProps, Flex } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { ReactNode, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as classes from "./overflowBox.module.css";
import clsx from "clsx";

const DEBOUNCE_WAIT = 50;

interface OverflowBoxProps {
  children: ReactNode;
  defaultMaxHeight: number;
  hasResizeObserver?: boolean;
  debounceWait?: number;
  overflowButton?: (isShowMore: boolean, toggle: () => void) => ReactNode;
  buttonProps?: ButtonProps;
}

export const OverflowBox = (props: OverflowBoxProps) => {
  const {
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
            rightSection={isShowMore ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
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
    <Box {...others}>
      <Box
        ref={ref}
        className={clsx(classes.innerBox, {
          [classes.mask]: isShowMore || !overflowState.canOverflow,
        })}
        style={{ maxHeight: isShowMore ? overflowState.actualHeight : defaultMaxHeight }}
      >
        {children}
      </Box>

      {renderOverflowButton()}
    </Box>
  );
};
