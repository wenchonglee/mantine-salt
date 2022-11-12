import {
  ActionIcon,
  Anchor,
  Center,
  ColorScheme,
  ColorSchemeProvider,
  Group,
  MantineProvider,
  Stack,
  Title,
} from "@mantine/core";
import { useLocalStorage, useMediaQuery } from "@mantine/hooks";
import { IconBrandGithub } from "@tabler/icons";
import { Link, Outlet, ReactLocation, Route, Router } from "react-location";
import { Home, Return, Routes, SegmentedToggle } from "./core";
import { OverflowTabsDemo } from "./OverflowTabs/OverflowTabsDemo";
import { TruncatedTextDemo } from "./TruncatedText/TruncatedTextDemo";

const location = new ReactLocation();

const routes: Route[] = [
  {
    path: Routes.Home,
    element: <Home />,
  },
  {
    path: Routes.TruncatedText,
    element: <TruncatedTextDemo />,
  },
  {
    path: Routes.OverflowTabs,
    element: <OverflowTabsDemo />,
  },
];

function App() {
  const matches = useMediaQuery("(min-width: 800px)");

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "color-scheme",
    defaultValue: "dark",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        withCSSVariables
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme,
        }}
      >
        <Router routes={routes} location={location}>
          <Center
            mx="md"
            sx={(theme) => ({
              [theme.fn.smallerThan("md")]: {
                marginBlock: theme.spacing.xs,
              },
              [theme.fn.largerThan("md")]: {
                marginBlock: theme.spacing.xl,
              },
              transition: "margin ease 250ms",
            })}
          >
            <Stack
              maw="1200px"
              sx={(theme) => ({
                [theme.fn.smallerThan("sm")]: {
                  minWidth: "320px",
                },
                [theme.fn.largerThan("sm")]: {
                  minWidth: "720px",
                },
                [theme.fn.largerThan("lg")]: {
                  minWidth: "1120px",
                },
                transition: "min-width ease 250ms, max-width ease 250ms",
              })}
            >
              <Group position="apart" noWrap>
                <Group noWrap spacing="xs">
                  <Anchor component={Link} to={Routes.Home}>
                    <Title size={matches ? "h1" : "h3"}>Mantine Salt</Title>
                  </Anchor>

                  <ActionIcon
                    component="a"
                    href="https://github.com/wenchonglee/mantine-salt"
                    target="_blank"
                    color="dark"
                    radius="xl"
                    size="xl"
                    variant="transparent"
                  >
                    <IconBrandGithub />
                  </ActionIcon>
                </Group>

                <SegmentedToggle />
              </Group>

              <Return />

              <Outlet />
            </Stack>
          </Center>
        </Router>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
