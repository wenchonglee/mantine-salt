import { Anchor, Badge, Box, Card, CSSObject, Group, Text, Title } from "@mantine/core";
import { DemoContent, DemoHeader, DemoShell, Source } from "../core";
import { TruncatedText } from "./TruncatedText";

const cardStyles: CSSObject = {
  width: "320px",
  resize: "horizontal",
};

export const TruncatedTextDemo = () => {
  return (
    <Box>
      <DemoHeader>
        <Box>
          <Badge color="green">Stable</Badge>
        </Box>

        <Group position="apart" align="flex-end">
          <Title>Truncated Text</Title>

          <Source
            componentLink="https://github.com/wenchonglee/mantine-salt/blob/main/src/TruncatedText/TruncatedText.tsx"
            demoLink="https://github.com/wenchonglee/mantine-salt/blob/main/src/TruncatedText/TruncatedTextDemo.tsx"
          />
        </Group>

        <Text>
          This component uses a{" "}
          <Anchor href="https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver">Resize Observer</Anchor> to
          check if the text has overflown.
          <br /> If it has, then a "Show more" button is rendered.
          <br />
          <br />
          To prevent unnecessary re-renders, the resize observer is disconnected after the "Show more" button has been
          clicked.
        </Text>
      </DemoHeader>

      <DemoContent>
        <Title order={2}>Usage</Title>

        <DemoShell header="Default" snippet={snippetA} description="Responsive when resized">
          <Card withBorder sx={cardStyles}>
            <TruncatedText
              lineClamp={3}
              text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
              when an unknown printer took a galley of type and scrambled it to make a type specimen book."
            />
          </Card>
        </DemoShell>

        <DemoShell header="No resize observer" snippet={snippetB}>
          <Card withBorder sx={cardStyles}>
            <TruncatedText
              hasResizeObserver={false}
              lineClamp={3}
              text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
              when an unknown printer took a galley of type and scrambled it to make a type specimen book."
            />
          </Card>
        </DemoShell>

        {/* <DemoShell header="Styles prop">
          <Card withBorder sx={cardStyles}>
            <TruncatedText
              lineClamp={3}
              text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
              when an unknown printer took a galley of type and scrambled it to make a type specimen book."
              styles={(theme) => ({
                text: {
                  color: theme.colors.cyan[4],
                },
                anchor: {
                  textDecoration: "underline",
                },
              })}
            />
          </Card>
        </DemoShell> */}
      </DemoContent>
    </Box>
  );
};

const snippetA = `
<TruncatedText
  lineClamp={3}
  text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
    when an unknown printer took a galley of type and scrambled it to make a type specimen book."
/>
`;

const snippetB = `
<TruncatedText
  lineClamp={3}
  hasResizeObserver={false}
  text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
    when an unknown printer took a galley of type and scrambled it to make a type specimen book."
/>
`;
