import { createStyles } from "@mantine/core";

type OverflowMenuStylesProps = {
  isOverflownTabSelected: boolean;
};

export const useStyles = createStyles((theme, { isOverflownTabSelected }: OverflowMenuStylesProps) => ({
  menuButton: {
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
