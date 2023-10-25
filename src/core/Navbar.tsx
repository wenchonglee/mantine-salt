import {
  AppShellSection,
  Box,
  Collapse,
  Group,
  MantineColor,
  ScrollArea,
  Text,
  ThemeIcon,
  UnstyledButton,
} from "@mantine/core";
import { IconBooks, IconChevronRight, IconPhotoUp, IconRowInsertBottom } from "@tabler/icons-react";
import { ReactElement, useState } from "react";
import { Link } from "react-location";
import { Routes } from "./routes";
import * as navbarStyles from "./navbar.module.css";
import * as linksStyles from "./links.module.css";

interface LinksGroupProps {
  icon: ReactElement;
  label: string;
  initiallyOpened?: boolean;
  iconColor?: MantineColor;
  isDimmed?: boolean;
  links?: { label: string; link: string }[];
  link?: string;
  setOpened(value: boolean): void;
}

export function LinksGroup({
  icon,
  label,
  initiallyOpened,
  iconColor,
  isDimmed,
  links,
  setOpened: setNavbarOpened,
}: LinksGroupProps) {
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);

  const items = (hasLinks ? links : []).map((link) => (
    <UnstyledButton
      component={Link}
      key={link.label}
      to={link.link}
      style={{ textDecoration: "none" }}
      getActiveProps={() => ({
        className: linksStyles.activeLink,
      })}
      onClick={() => setNavbarOpened(false)}
    >
      <Text className={linksStyles.link} c={isDimmed ? "dimmed" : undefined}>
        {link.label}
      </Text>
    </UnstyledButton>
  ));

  return (
    <>
      <UnstyledButton onClick={() => setOpened((o) => !o)} className={linksStyles.control}>
        <Group justify="apart" gap={0}>
          <Box style={{ display: "flex", alignItems: "center" }}>
            <ThemeIcon variant="light" size={30} color={iconColor}>
              {icon}
            </ThemeIcon>
            <Text ml="md" c={isDimmed ? "dimmed" : undefined}>
              {label}
            </Text>
          </Box>
          {hasLinks && (
            <IconChevronRight
              className={linksStyles.chevron}
              size={14}
              stroke={1.5}
              style={{
                transform: opened ? `rotate(90deg)` : "none",
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
    icon: <IconRowInsertBottom size={18} />,
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
    label: "Other libraries",
    icon: <IconBooks size={18} />,
    initiallyOpened: true,
    links: [{ label: "Virtuoso + Infinite Query", link: Routes.VirtuosoInfiniteQuery }],
  },
  // {
  //   label: "Archived/abandoned",
  //   icon: IconMoodEmpty,
  //   iconColor: "orange",
  //   isDimmed: true,
  //   links: [
  //     { label: "Truncated Text", link: Routes.TruncatedText },
  //     { label: "Scrollable Tabs", link: Routes.ScrollableTabs },
  //   ],
  // },
];

export const Navbar = ({ setOpened }: { opened: boolean; setOpened(value: boolean): void }) => {
  const links = navs.map((item) => <LinksGroup {...item} key={item.label} setOpened={setOpened} />);

  return (
    <AppShellSection grow className={navbarStyles.links} component={ScrollArea}>
      {links}
    </AppShellSection>
  );
};
