import { Card, Center, Divider, Space, Text } from "@mantine/core";
import { ReactNode } from "react";

type DemoShellProps = {
  header: string | ReactNode;
  description?: string;
  children: ReactNode;
};

export const DemoShell = ({ children, description, header }: DemoShellProps) => {
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
