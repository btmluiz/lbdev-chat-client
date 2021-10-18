import { useLocation } from "react-router-dom";
import * as H from "history";

export type LocationProps = {
  location: H.Location;
};

export const withLocation = (Component: any) => (props: any) => {
  const location = useLocation();

  return <Component location={location} {...props} />;
};
