import { Box, Card, Grid, Group, MantineGradient, Text } from "@mantine/core";
import { ReactNode } from "react";
import { Link } from "react-location";
import { Routes } from "./routes";

type GridItemProps = {
  children?: ReactNode | undefined;
  to: Routes;
};

const GridItem = ({ children, to }: GridItemProps) => {
  return (
    <Grid.Col md={6} lg={4}>
      <Link to={to} style={{ textDecoration: "none" }}>
        <Card
          withBorder
          radius="md"
          shadow="md"
          p={0}
          sx={(theme) => ({
            transition: "box-shadow 250ms ease, translate 250ms ease",
            "&:hover": {
              boxShadow: theme.shadows.xl,
              translate: "0px -4px",
            },
          })}
        >
          <Group noWrap align="flex-start" spacing={0}>
            {children}
          </Group>
        </Card>
      </Link>
    </Grid.Col>
  );
};

type IconProps = {
  children?: ReactNode | undefined;
  gradient: MantineGradient;
};

const Icon = ({ children, gradient }: IconProps) => {
  return (
    <Box
      p="md"
      sx={(theme) => ({
        background: theme.fn.gradient(gradient),
      })}
    >
      {children}
    </Box>
  );
};

type ContentProps = {
  title: string;
  content: string;
};

const Content = ({ title, content }: ContentProps) => {
  return (
    <Box p="md" w="100%">
      <Text fw={700} size="lg">
        {title}
      </Text>

      <Text size="xs" lineClamp={2}>
        {content}
      </Text>
    </Box>
  );
};

GridItem.Icon = Icon;
GridItem.Content = Content;

export { GridItem };
