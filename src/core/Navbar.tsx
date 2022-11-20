import {
  Box,
  Collapse,
  createStyles,
  Group,
  Navbar as MantineNavbar,
  ScrollArea,
  Text,
  ThemeIcon,
  UnstyledButton,
} from "@mantine/core";
import {
  IconChevronLeft,
  IconChevronRight,
  IconInputSearch,
  IconMicroscope,
  IconPhotoUp,
  IconRowInsertBottom,
  TablerIcon,
} from "@tabler/icons";
import { useState } from "react";
import { Link } from "react-location";
import { Routes } from "./routes";

const useLinksStyles = createStyles((theme) => ({
  control: {
    fontWeight: 500,
    display: "block",
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    fontSize: theme.fontSizes.sm,

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  link: {
    fontWeight: 500,
    display: "block",
    textDecoration: "none",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    paddingLeft: 31,
    marginLeft: 30,
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
    borderLeft: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]}`,

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  activeLink: {
    "& > div": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
      "&:hover": {
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1],
      },
    },
  },

  chevron: {
    transition: "transform 200ms ease",
  },
}));

interface LinksGroupProps {
  icon: TablerIcon;
  label: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
  link?: string;
}

export function LinksGroup({ icon: Icon, label, initiallyOpened, links, link }: LinksGroupProps) {
  const { classes, theme } = useLinksStyles();
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const ChevronIcon = theme.dir === "ltr" ? IconChevronRight : IconChevronLeft;
  const items = (hasLinks ? links : []).map((link) => (
    <Link
      key={link.label}
      to={link.link}
      style={{ textDecoration: "none" }}
      getActiveProps={() => {
        return {
          className: classes.activeLink,
        };
      }}
    >
      <Text className={classes.link}>{link.label}</Text>
    </Link>
  ));

  return (
    <>
      <Link to={link} style={{ textDecoration: "none" }}>
        <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
          <Group position="apart" spacing={0}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ThemeIcon variant="light" size={30}>
                <Icon size={18} />
              </ThemeIcon>
              <Box ml="md">{label}</Box>
            </Box>
            {hasLinks && (
              <ChevronIcon
                className={classes.chevron}
                size={14}
                stroke={1.5}
                style={{
                  transform: opened ? `rotate(${theme.dir === "rtl" ? -90 : 90}deg)` : "none",
                }}
              />
            )}
          </Group>
        </UnstyledButton>
      </Link>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}

const navs = [
  {
    label: "Overflow",
    icon: IconRowInsertBottom,
    initiallyOpened: true,
    links: [
      { label: "Truncated Text", link: Routes.TruncatedText },
      { label: "Scrollable Tabs", link: Routes.ScrollableTabs },
      { label: "Overflow Tabs", link: Routes.OverflowTabs2 },
    ],
  },
  {
    label: "Inputs",
    icon: IconInputSearch,
    initiallyOpened: true,
    links: [
      { label: "Search MultiSelect", link: Routes.SearchMultiSelect },
      { label: "Tree Dropdown", link: "/not-found" },
    ],
  },
  {
    label: "Experimental",
    icon: IconMicroscope,
    initiallyOpened: true,
    links: [
      {
        label: "Lightbox Carousel",
        icon: IconPhotoUp,
        link: Routes.LightboxCarousel,
      },
      { label: "Ag-grid Themed Table", link: Routes.MantineAgGrid },
    ],
  },
];

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    borderBottom: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]}`,
  },

  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
  },
}));

export const Navbar = ({ opened }: { opened: boolean }) => {
  const { classes } = useStyles();
  const links = navs.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <MantineNavbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
      <MantineNavbar.Section grow className={classes.links} component={ScrollArea}>
        {links}
      </MantineNavbar.Section>
    </MantineNavbar>
  );
};
