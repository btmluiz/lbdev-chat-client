import React from "react";
import { Route, RouterProps, withRouter } from "react-router-dom";
import HomePage from "@pages/home";
import { compose } from "redux";
import LoginPage from "@pages/login";
import NavigationService from "@services/navigation";
import ChatRoute from "@routes/chat";

type Props = RouterProps & {};

class MainRoute extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);

    NavigationService.setNavigator(props.history);
  }

  render() {
    return (
      <>
        <Route path={"/"} exact component={HomePage} />
        <Route path={"/login"} exact component={LoginPage} />
        <Route path={"/chat"} exact component={ChatRoute} />
      </>
    );
  }
}

export default compose<any>(withRouter)(MainRoute);
