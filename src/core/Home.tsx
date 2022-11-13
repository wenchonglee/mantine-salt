import { Grid } from "@mantine/core";
import { IconAppWindow, IconPhotoUp, IconRowInsertBottom, IconTable, IconTrees } from "@tabler/icons";
import { GridItem } from "./GridItem";
import { Routes } from "./routes";

export const Home = () => {
  return (
    <Grid>
      <GridItem to={Routes.TruncatedText}>
        <GridItem.Icon gradient={{ from: "blue", to: "teal", deg: 45 }}>
          <IconRowInsertBottom size={64} color="white" />
        </GridItem.Icon>

        <GridItem.Content title="Truncated Text" content="Render a 'show more' button when line clamp is active" />
      </GridItem>

      <GridItem to={Routes.OverflowTabs}>
        <GridItem.Icon gradient={{ from: "teal", to: "green", deg: 45 }}>
          <IconAppWindow size={64} color="white" />
        </GridItem.Icon>

        <GridItem.Content title="Overflow Tabs" content="Scrollable, single row tabs" />
      </GridItem>

      <GridItem to={Routes.LightboxCarousel}>
        <GridItem.Icon gradient={{ from: "green", to: "lime", deg: 45 }}>
          <IconPhotoUp size={64} color="white" />
        </GridItem.Icon>

        <GridItem.Content title="Lightbox Carousel" content="A @mantine/carousel with lightbox behavior" />
      </GridItem>

      <GridItem to={Routes.MantineAgGrid}>
        <GridItem.Icon
          // gradient={{ from: "green", to: "lime", deg: 45 }}
          gradient={{ from: "gray", to: "gray", deg: 45 }}
        >
          <IconTable size={64} color="white" />
        </GridItem.Icon>

        <GridItem.Content
          title="Ag-grid Themed Table"
          // content="Tree select"
          content="Work in progress"
        />
      </GridItem>

      <GridItem to={Routes.Home}>
        <GridItem.Icon
          // gradient={{ from: "green", to: "lime", deg: 45 }}
          gradient={{ from: "gray", to: "gray", deg: 45 }}
        >
          <IconTrees size={64} color="white" />
        </GridItem.Icon>

        <GridItem.Content
          title="Tree Dropdown"
          // content="Tree select"
          content="Work in progress"
        />
      </GridItem>
    </Grid>
  );
};
