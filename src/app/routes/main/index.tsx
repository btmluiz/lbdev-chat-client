import React from "react";
import { Route, RouterProps, Switch, withRouter } from "react-router-dom";
import HomePage from "@pages/home";
import { compose } from "redux";
import NavigationService from "@services/navigation";
import { AnimatePresence } from "framer-motion";
import ChatRoute from "@routes/chat";
import { LocationProps, withLocation } from "@hooks/location";
import AuthRouter from "@routes/auth";
import NewAuthPage from "@pages/new-auth";

type Props = RouterProps & LocationProps & {};

class MainRoute extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);

    NavigationService.setNavigator(props.history);
  }

  render() {
    const {
      props: { location },
    } = this;
    return (
      <>
        <Switch>
          <Route path={"/"} exact component={HomePage} />
          <Route path={"/chat"} exact component={ChatRoute} />
          <Route path={"/auth"} component={NewAuthPage} />
        </Switch>
      </>
    );
  }
}

export default compose<any>(withRouter, withLocation)(MainRoute);
