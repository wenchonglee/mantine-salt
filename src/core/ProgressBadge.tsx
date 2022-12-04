import { Badge, Box, HoverCard, Space, Text, Timeline } from "@mantine/core";

type ProgressStage = "0" | "1" | "2" | "3" | "abandoned";

type ProgressHoverCardProps = {
  stage: ProgressStage;
};

export const ProgressHoverCard = (props: ProgressHoverCardProps) => {
  const { stage } = props;

  return (
    <HoverCard withinPortal width="400px" position="bottom-start" shadow="xl">
      <HoverCard.Target>
        <Box w="fit-content">
          <ProgressBadge stage={stage} />
        </Box>
      </HoverCard.Target>

      <HoverCard.Dropdown>
        <Text size="xl" fw={700} mb="xs">
          Stages
        </Text>
        <ProgressDetails />
      </HoverCard.Dropdown>
    </HoverCard>
  );
};

type ProgressBadgeProps = {
  stage: ProgressStage;
};

export const ProgressBadge = (props: ProgressBadgeProps) => {
  const { stage } = props;

  switch (stage) {
    case "0":
      return <Badge color="violet">0. Potential Work</Badge>;

    case "1":
      return <Badge>1. Work in Progress</Badge>;

    case "2":
      return <Badge color="cyan">2. Functionally Complete</Badge>;

    case "3":
      return <Badge color="teal">3. Stable</Badge>;

    case "abandoned":
      return <Badge color="orange">Abandoned</Badge>;
  }
};

export const ProgressDetails = () => {
  return (
    <>
      <Timeline active={4} color="gray">
        <Timeline.Item title={<ProgressBadge stage="0" />}>
          <Text color="dimmed" size="sm">
            We've identified that we might need this, but the scope is undefined, or the timeline is further away.
          </Text>
        </Timeline.Item>

        <Timeline.Item title={<ProgressBadge stage="1" />}>
          <Text color="dimmed" size="sm">
            This component is being worked on, but being a proof of concept, this component will undergo multiple
            changes at this stage.
          </Text>
        </Timeline.Item>

        <Timeline.Item title={<ProgressBadge stage="2" />}>
          <Text color="dimmed" size="sm">
            This component has reached its functional goals, and is unlikely to change on this aspect.
            <br />
            The styles of this component may still change at this point.
          </Text>
        </Timeline.Item>

        <Timeline.Item title={<ProgressBadge stage="3" />}>
          <Text color="dimmed" size="sm">
            The styles of this component has also been cleared, and the component is unlikely to change from this point.
          </Text>
        </Timeline.Item>
      </Timeline>

      <Space h="md" />

      <Timeline>
        <Timeline.Item title={<ProgressBadge stage="abandoned" />}>
          <Text color="dimmed" size="sm">
            This idea didn't work out, but is kept around for reference.
          </Text>
        </Timeline.Item>
      </Timeline>
    </>
  );
};
