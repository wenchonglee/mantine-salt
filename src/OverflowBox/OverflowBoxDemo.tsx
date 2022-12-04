import { ActionIcon, Anchor, Box, Card, CSSObject, Group, Image, Text, Title } from "@mantine/core";
import { IconArrowBigDownLine, IconArrowBigUpLine } from "@tabler/icons";
import { DemoContent, DemoHeader, DemoShell, Source } from "../core";
import { ProgressHoverCard } from "../core/ProgressBadge";
import { OverflowBox } from "./OverflowBox";

const cardStyles: CSSObject = {
  width: "320px",
  resize: "horizontal",
};

export const OverflowBoxDemo = () => {
  return (
    <Box>
      <DemoHeader>
        <Box>
          <ProgressHoverCard stage="2" />
        </Box>

        <Group position="apart" align="flex-end">
          <Title>Overflow Box</Title>

          <Source
            componentLink="https://github.com/wenchonglee/mantine-salt/blob/main/src/OverflowBox/OverflowBox.tsx"
            demoLink="https://github.com/wenchonglee/mantine-salt/blob/main/src/OverflowBox/OverflowBoxDemo.tsx"
          />
        </Group>

        <Text>
          This component uses a{" "}
          <Anchor href="https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver">Resize Observer</Anchor> to
          check if the content needs more height to show everything.
          <br />
          <br />
          The behavior of this component can be summarized as such:
          <ul>
            <li>On render, check if the content is overflowing </li>
            <ul>
              <li>If it has, render a "Show more" button</li>
              <li>
                While "Show more" has not been hit, the ResizeObserver will continuously check if there is a need to
                render the "Show more" button
              </li>
            </ul>
            <li>
              If the "Show more" button is hit, the ResizeObserver is disconnected, and a "Show less" button will stay
              rendered
            </li>
          </ul>
        </Text>
      </DemoHeader>

      <DemoContent>
        <Title order={2}>Usage</Title>
        <DemoShell header="Default" snippet={snippetA} description="Responsive when resized">
          <Card withBorder sx={cardStyles}>
            <OverflowBox defaultMaxHeight={100}>
              <Text>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book.
              </Text>
            </OverflowBox>
          </Card>
        </DemoShell>

        <DemoShell header="No resize observer" snippet={snippetB}>
          <Card withBorder sx={cardStyles}>
            <OverflowBox hasResizeObserver={false} defaultMaxHeight={100}>
              <Text>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book.
              </Text>
            </OverflowBox>
          </Card>
        </DemoShell>

        <DemoShell header="Kitchen sink" snippet={snippetC}>
          <Card withBorder sx={cardStyles}>
            <OverflowBox
              defaultMaxHeight={100}
              debounceWait={0}
              overflowButton={(isShowMore, toggle) => (
                <ActionIcon onClick={toggle} color="grape">
                  {isShowMore ? <IconArrowBigUpLine /> : <IconArrowBigDownLine />}
                </ActionIcon>
              )}
            >
              <Title order={3}> Title </Title>
              <Text size="sm">
                <Image
                  src="https://avatars.githubusercontent.com/u/18256786?v=4"
                  ml="md"
                  radius="md"
                  width={50}
                  height={50}
                  sx={{ float: "right" }}
                />
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book.
              </Text>
            </OverflowBox>
          </Card>
        </DemoShell>
      </DemoContent>
    </Box>
  );
};

const snippetA = `
<OverflowBox defaultMaxHeight={100}>
  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
  industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
  scrambled it to make a type specimen book.
</OverflowBox>
`;

const snippetB = `
<OverflowBox hasResizeObserver={false} defaultMaxHeight={100}>
  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
  industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
  scrambled it to make a type specimen book.
</OverflowBox>
`;

const snippetC = `
<OverflowBox
  defaultMaxHeight={100}
  debounceWait={0}
  overflowButton={(isShowMore, toggle) => (
    <ActionIcon onClick={toggle} color="grape">
      {isShowMore ? <IconArrowBigUpLine /> : <IconArrowBigDownLine />}
    </ActionIcon>
  )}
>
  <Title order={3}> Title </Title>
  <Text size="sm">
    <Image
      src="https://avatars.githubusercontent.com/u/18256786?v=4"
      ml="md"
      radius="md"
      width={100}
      height={100}
      sx={{ float: "right" }}
    />
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
    industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
    scrambled it to make a type specimen book.
  </Text>
</OverflowBox>
`;
