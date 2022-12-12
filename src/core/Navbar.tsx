import {
  Box,
  Collapse,
  createStyles,
  Group,
  MantineColor,
  Navbar as MantineNavbar,
  ScrollArea,
  Text,
  ThemeIcon,
  UnstyledButton,
} from "@mantine/core";
import {
  IconBooks,
  IconChevronLeft,
  IconChevronRight,
  IconInputSearch,
  IconMoodEmpty,
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
    // fontWeight: 500,
    display: "block",
    textDecoration: "none",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    paddingLeft: 31,
    marginLeft: 30,
    fontSize: theme.fontSizes.sm,
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
  iconColor?: MantineColor;
  isDimmed?: boolean;
  links?: { label: string; link: string }[];
  link?: string;
  setOpened(value: boolean): void;
}

export function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  iconColor,
  isDimmed,
  links,
  link,
  setOpened: setNavbarOpened,
}: LinksGroupProps) {
  const { classes, theme } = useLinksStyles();
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const ChevronIcon = theme.dir === "ltr" ? IconChevronRight : IconChevronLeft;
  const items = (hasLinks ? links : []).map((link) => (
    <UnstyledButton
      component={Link}
      key={link.label}
      to={link.link}
      style={{ textDecoration: "none" }}
      getActiveProps={() => ({
        className: classes.activeLink,
      })}
      onClick={() => setNavbarOpened(false)}
    >
      <Text className={classes.link} color={isDimmed ? "dimmed" : undefined}>
        {link.label}
      </Text>
    </UnstyledButton>
  ));

  return (
    <>
      <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
        <Group position="apart" spacing={0}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ThemeIcon variant="light" size={30} color={iconColor}>
              <Icon size={18} />
            </ThemeIcon>
            <Text ml="md" color={isDimmed ? "dimmed" : undefined}>
              {label}
            </Text>
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
      { label: "Overflow Box", link: Routes.OverflowBox },
      { label: "Overflow Tabs", link: Routes.OverflowTabs2 },
      {
        label: "Overflow Images",
        icon: IconPhotoUp,
        link: Routes.OverflowImages,
      },
    ],
  },
  {
    label: "Inputs",
    icon: IconInputSearch,
    initiallyOpened: true,
    links: [
      { label: "Search MultiSelect", link: Routes.SearchMultiSelect },
      // { label: "Tree Dropdown", link: "/not-found" },
    ],
  },
  {
    label: "Other libraries",
    icon: IconBooks,
    initiallyOpened: true,
    links: [
      { label: "Virtuoso + Infinite Query", link: Routes.VirtuosoInfiniteQuery },
      { label: "Ag-grid Themed Table", link: Routes.MantineAgGrid },
    ],
  },
  {
    label: "Abandoned",
    icon: IconMoodEmpty,
    iconColor: "orange",
    isDimmed: true,
    // initiallyOpened: true,
    links: [
      { label: "Truncated Text", link: Routes.TruncatedText },
      { label: "Scrollable Tabs", link: Routes.ScrollableTabs },
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

export const Navbar = ({ opened, setOpened }: { opened: boolean; setOpened(value: boolean): void }) => {
  const { classes } = useStyles();
  const links = navs.map((item) => <LinksGroup {...item} key={item.label} setOpened={setOpened} />);

  return (
    <MantineNavbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
      <MantineNavbar.Section grow className={classes.links} component={ScrollArea}>
        {links}
      </MantineNavbar.Section>
    </MantineNavbar>
  );
};
