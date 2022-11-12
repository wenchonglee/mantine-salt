import { Anchor } from "@mantine/core";
import { Link, useMatchRoute } from "react-location";
import { Routes } from "./routes";

export const Return = () => {
  const matchRoute = useMatchRoute();

  if (!matchRoute({ to: "/" })) {
    return (
      <Anchor component={Link} to={Routes.Home}>
        Go back
      </Anchor>
    );
  }

  return null;
};
