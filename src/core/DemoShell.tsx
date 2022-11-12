import { Button, Card, Center, Divider, Space, Text } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons";
import { ReactNode } from "react";

type DemoShellProps = {
  header: string | ReactNode;
  description?: string;
  children: ReactNode;
};

const DemoShell = ({ children, description, header }: DemoShellProps) => {
  return (
    <Card w="100%" withBorder>
      <Text fw={700}>{header}</Text>

      {description && (
        <Text color="dimmed" size="sm">
          {description}
        </Text>
      )}
      <Space h="md" />

      <Card.Section mb="md">
        <Divider />
      </Card.Section>

      <Center>{children}</Center>
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
      <Button leftIcon={<IconBrandGithub />} variant="gradient" component="a" href={componentLink} target="_blank">
        Component source
      </Button>
      <Button
        leftIcon={<IconBrandGithub />}
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

DemoShell.Source = Source;

export { DemoShell };
