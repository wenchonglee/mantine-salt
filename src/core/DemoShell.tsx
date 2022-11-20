import { Box, Button, Card, Center, Divider, Stack, Text, useMantineTheme } from "@mantine/core";
import { Prism } from "@mantine/prism";
import { IconBrandGithub } from "@tabler/icons";
import { ReactNode } from "react";

type DemoShellProps = {
  header: string | ReactNode;
  description?: string;
  children: ReactNode;
  snippet?: string;
};

const DemoShell = ({ children, description, header, snippet }: DemoShellProps) => {
  const theme = useMantineTheme();

  return (
    <Card w="100%" withBorder>
      <Card.Section bg={theme.colorScheme === "dark" ? "dark.8" : "gray.0"} p="md">
        <Text fw={700}>{header}</Text>
        {description && (
          <Text color="dimmed" size="sm">
            {description}
          </Text>
        )}
      </Card.Section>

      <Card.Section mb="md">
        <Divider />
      </Card.Section>

      <Center>{children}</Center>

      {snippet && (
        <Card.Section mt="md">
          <Prism language="tsx">{snippet}</Prism>
        </Card.Section>
      )}
    </Card>
  );
};

type SourceProps = {
  componentLink: string;
  demoLink: string;
};

const Source = ({ componentLink, demoLink }: SourceProps) => {
  return (
    <Button.Group>
      <Button
        compact
        leftIcon={<IconBrandGithub size={16} />}
        variant="gradient"
        component="a"
        href={componentLink}
        target="_blank"
      >
        Component source
      </Button>
      <Button
        compact
        leftIcon={<IconBrandGithub size={16} />}
        fullWidth={false}
        variant="default"
        component="a"
        href={demoLink}
        target="_blank"
      >
        Demo source
      </Button>
    </Button.Group>
  );
};

const DemoHeader = ({ children }: { children: ReactNode }) => {
  const theme = useMantineTheme();

  return (
    <Box bg={theme.colorScheme === "dark" ? "dark.8" : "gray.1"} p="xl" mb="xl">
      <Stack maw="1200px" mx="auto">
        {children}
      </Stack>
    </Box>
  );
};

const DemoContent = ({ children }: { children: ReactNode }) => {
  return (
    <Stack maw="1200px" mx={"auto"} mb="xl">
      {children}
    </Stack>
  );
};

export { DemoShell, Source, DemoHeader, DemoContent };
