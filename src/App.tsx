import {
  ActionIcon,
  Alert,
  AppShell,
  Burger,
  ColorScheme,
  ColorSchemeProvider,
  Group,
  Header,
  MantineProvider,
  MediaQuery,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { IconBrandGithub, IconSalt } from "@tabler/icons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Link, Outlet, ReactLocation, Route, Router } from "react-location";
import { Home, Routes, SegmentedToggle } from "./core";
import { Navbar } from "./core/Navbar";
import { MantineAgGridDemo } from "./MantineAgGrid";
import { OverflowBoxDemo } from "./OverflowBox/OverflowBoxDemo";
import { OverflowImagesDemo } from "./OverflowImages";
import { OverflowTabsDemo } from "./OverflowTabs";
import { ScrollableTabsDemo } from "./ScrollableTabs/ScrollableTabsDemo";
import { SearchMultiSelectDemo } from "./SearchMultiSelect";
import { TruncatedTextDemo } from "./TruncatedText/TruncatedTextDemo";
import { VirtuosoInfiniteQueryDemo } from "./VirtuosoInfiniteQuery/VirtuosoInfiniteQueryDemo";

const location = new ReactLocation();
const queryClient = new QueryClient();

const routes: Route[] = [
  { path: Routes.Home, element: <Home /> },
  { path: Routes.OverflowBox, element: <OverflowBoxDemo /> },
  { path: Routes.TruncatedText, element: <TruncatedTextDemo /> },
  { path: Routes.ScrollableTabs, element: <ScrollableTabsDemo /> },
  { path: Routes.OverflowTabs2, element: <OverflowTabsDemo /> },
  { path: Routes.OverflowImages, element: <OverflowImagesDemo /> },
  { path: Routes.MantineAgGrid, element: <MantineAgGridDemo /> },
  { path: Routes.SearchMultiSelect, element: <SearchMultiSelectDemo /> },
  { path: Routes.VirtuosoInfiniteQuery, element: <VirtuosoInfiniteQueryDemo /> },
  {
    path: "*",
    element: (
      <Alert color="yellow" title="Not found">
        This page doesn't exist yet
      </Alert>
    ),
  },
];

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "color-scheme",
    defaultValue: "dark",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  const [opened, setOpened] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
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
          <AppShell
            padding={0}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            navbar={<Navbar opened={opened} setOpened={setOpened} />}
            header={
              <Header height={50} p="md">
                <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
                  <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                    <Burger
                      opened={opened}
                      onClick={() => setOpened((o) => !o)}
                      size="sm"
                      // color={theme.colors.gray[6]}
                      mr="xl"
                    />
                  </MediaQuery>

                  <Group position="apart" w="100%" noWrap>
                    <UnstyledButton component={Link} to={Routes.Home}>
                      <Group>
                        <IconSalt />
                        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
                          <Title size="h4">Mantine Salt</Title>
                        </MediaQuery>
                      </Group>
                    </UnstyledButton>

                    <Group noWrap spacing="xs">
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
                      <SegmentedToggle />
                    </Group>
                  </Group>
                </div>
              </Header>
            }
          >
            <Outlet />
          </AppShell>
        </Router>
      </MantineProvider>
    </ColorSchemeProvider>
    </QueryClientProvider>
  );
}

export default App;
