import { Alert, Anchor, Box, Text, Title } from "@mantine/core";
import { DemoContent } from "./DemoShell";

export const Home = () => {
  return (
    <Box p="xl">
      <DemoContent>
        <Title>Mantine Salt</Title>
        <Text td="italic" c="dimmed" size="xs" mt="-lg" mb="lg">
          niche components built with mantine
        </Text>

        <Alert title={<Title order={2}>Disclaimer</Title>} w="fit-content">
          <Text>
            This repository contains a few <b>"Proof of Concept"</b> components I wrote for work. <br />
            As such, they are purpose built for my usage and may not meet your needs. <br /> <br />
            In the spirit of sharing, they are open sourced and you're welcome to reuse the code and convert it into
            something else. <br />
            <em>
              It is unlikely that I will write tests for these components, as I will spend that effort in my work
              projects. (they are slightly different there)
            </em>
          </Text>

          <Text c="yellow" my="lg">
            There were a couple more components than this when I wrote it for Mantine v6. You can still reference it{" "}
            <Anchor href="https://github.com/wenchonglee/mantine-salt/tree/93ac377ea941947c8bbee13851d8496393d80dcf">
              at this commit.
            </Anchor>
            <br />
            The remaining components here were migrated to Mantine v7 as a test bed of how much effort I will need for
            migrating other projects
          </Text>
        </Alert>
      </DemoContent>
    </Box>
  );
};
