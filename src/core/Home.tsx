import { Alert, Box, Text, Title } from "@mantine/core";
import { DemoContent } from "./DemoShell";
import { ProgressDetails } from "./ProgressBadge";

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
            This repository contains a few <b>"Proof of Concept"</b> components I wrote for work. <br />
            As such, they are purpose built for my usage and may not meet your needs. <br /> <br />
            In the spirit of sharing, they are open sourced and you're welcome to reuse the code and convert it into
            something else.
          </Text>
        </Alert>

        <Text>Badges denote the stage of these components:</Text>
        <ProgressDetails />
      </DemoContent>
    </Box>
  );
};
