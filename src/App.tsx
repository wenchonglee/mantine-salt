import { ActionIcon, Alert, AppShell, Burger, Group, MantineProvider, Title, UnstyledButton } from "@mantine/core";
import { IconBrandGithub, IconSalt } from "@tabler/icons-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Link, Outlet, ReactLocation, Route, Router } from "react-location";
import { Home, Routes, SegmentedToggle } from "./core";
import { Navbar } from "./core/Navbar";
import { OverflowBoxDemo } from "./OverflowBox/OverflowBoxDemo";
import { OverflowImagesDemo } from "./OverflowImages";
import { OverflowTabsDemo } from "./OverflowTabs";
// import { ScrollableTabsDemo } from "./ScrollableTabs/ScrollableTabsDemo";
// import { TruncatedTextDemo } from "./TruncatedText/TruncatedTextDemo";
import { VirtuosoInfiniteQueryDemo } from "./VirtuosoInfiniteQuery/VirtuosoInfiniteQueryDemo";

const location = new ReactLocation();
const queryClient = new QueryClient();

const routes: Route[] = [
  { path: Routes.Home, element: <Home /> },
  { path: Routes.OverflowBox, element: <OverflowBoxDemo /> },
  // { path: Routes.TruncatedText, element: <TruncatedTextDemo /> },
  // { path: Routes.ScrollableTabs, element: <ScrollableTabsDemo /> },
  { path: Routes.OverflowTabs2, element: <OverflowTabsDemo /> },
  { path: Routes.OverflowImages, element: <OverflowImagesDemo /> },
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
  const [opened, setOpened] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider defaultColorScheme="dark">
        <Router routes={routes} location={location}>
          <AppShell
            header={{
              height: 50,
            }}
            navbar={{ width: 250, breakpoint: "sm", collapsed: { mobile: !opened } }}
          >
            <AppShell.Header p="md">
              <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
                <Burger
                  hiddenFrom="sm"
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  // color={theme.colors.gray[6]}
                  mr="xl"
                />

                <Group justify="space-between" w="100%" wrap="nowrap">
                  <UnstyledButton component={Link} to={Routes.Home}>
                    <Group>
                      <IconSalt />
                      <Title size="h4" visibleFrom="sm">
                        Mantine Salt
                      </Title>
                    </Group>
                  </UnstyledButton>

                  <Group wrap="nowrap" gap="xs">
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
            </AppShell.Header>

            <AppShell.Navbar p="md">
              <Navbar opened={opened} setOpened={setOpened} />
            </AppShell.Navbar>

            <AppShell.Main>
              <Outlet />
            </AppShell.Main>
          </AppShell>
        </Router>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
