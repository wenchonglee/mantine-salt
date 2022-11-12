import { Card, CSSObject, Flex, Stack } from "@mantine/core";
import { DemoShell } from "../core";
import { TruncatedText } from "./TruncatedText";

const cardStyles: CSSObject = {
  width: "320px",
  resize: "horizontal",
};

export const TruncatedTextDemo = () => {
  return (
    <Stack>
      <Flex justify="flex-end">
        <DemoShell.Source
          componentLink="https://github.com/wenchonglee/mantine-salt/blob/main/src/TruncatedText/TruncatedText.tsx"
          demoLink="https://github.com/wenchonglee/mantine-salt/blob/main/src/TruncatedText/TruncatedTextDemo.tsx"
        />
      </Flex>

      <DemoShell
        header="Default"
        description="Has a resize observer to update overflow state. Disconnects if 'Show more' is triggered"
      >
        <Card withBorder sx={cardStyles}>
          <TruncatedText
            lineClamp={3}
            text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
              when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          />
        </Card>
      </DemoShell>

      <DemoShell header="No resize observer">
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

      <DemoShell header="Styles prop">
        <Card withBorder sx={cardStyles}>
          <TruncatedText
            lineClamp={3}
            text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
              when an unknown printer took a galley of type and scrambled it to make a type specimen book."
            styles={(theme) => ({
              text: {
                color: theme.colors.cyan,
              },
              anchor: {
                textDecoration: "underline",
              },
            })}
          />
        </Card>
      </DemoShell>
    </Stack>
  );
};
