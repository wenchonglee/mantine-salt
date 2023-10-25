import { CodeHighlight } from "@mantine/code-highlight";
import { Box, Button, Card, Center, Divider, Stack, Text, useMantineColorScheme } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";
import { ReactNode } from "react";

type DemoShellProps = {
  header: string | ReactNode;
  description?: ReactNode;
  children: ReactNode;
  snippet?: string;
};

const DemoShell = ({ children, description, header, snippet }: DemoShellProps) => {
  const { colorScheme } = useMantineColorScheme();

  return (
    <Card w="100%" withBorder>
      <Card.Section bg={colorScheme === "dark" ? "dark.8" : "gray.0"} p="md">
        <Text fw={700}>{header}</Text>
        {description && (
          <Text c="dimmed" size="sm" style={{ whiteSpace: "pre-wrap" }}>
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
          <CodeHighlight code={snippet} language="tsx" copyLabel="Copy button code" copiedLabel="Copied!" />
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
        size="compact-sm"
        leftSection={<IconBrandGithub size={16} />}
        variant="gradient"
        component="a"
        href={componentLink}
        target="_blank"
      >
        Component source
      </Button>
      <Button
        size="compact-sm"
        leftSection={<IconBrandGithub size={16} />}
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
  const { colorScheme } = useMantineColorScheme();

  return (
    <Box bg={colorScheme === "dark" ? "dark.8" : "gray.1"} p="xl" mb="xl">
      <Stack maw="1200px" mx="auto">
        {children}
      </Stack>
    </Box>
  );
};

const DemoContent = ({ children }: { children: ReactNode }) => {
  return (
    <Stack maw="1200px" mx={"auto"} mb="xl" p="md">
      {children}
    </Stack>
  );
};

export { DemoShell, Source, DemoHeader, DemoContent };
