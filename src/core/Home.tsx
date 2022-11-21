import { Alert, Box, Text, Title } from "@mantine/core";
import { DemoContent } from "./DemoShell";

export const Home = () => {
  return (
    <Box p="xl">
      <DemoContent>
        <Title>Mantine Salt</Title>
        <Text italic color="dimmed" size="xs">
          niche components built with mantine
        </Text>

        <Alert title={<Title order={2}>Disclaimer</Title>} w="fit-content">
          <Text>
            This repository contains a few components I wrote for work. <br />
            As such, they are purpose built for my usage and may not meet your needs. <br /> <br />
            In the spirit of sharing, they are open sourced and you're welcome to reuse the code and convert it into
            something else.
          </Text>
        </Alert>
      </DemoContent>
    </Box>
  );
};
