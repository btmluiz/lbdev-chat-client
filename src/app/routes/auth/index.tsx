import * as React from "react";
import * as Styled from "./styled";
import { Switch } from "react-router-dom";
import LoginPage from "@pages/login";
import { AnimatePresence } from "framer-motion";
import { LocationProps, withLocation } from "@hooks/location";
import { compose } from "redux";

type Props = LocationProps & {};

class AuthRouter extends React.Component<Props> {
  render() {
    const {
      props: { location },
    } = this;
    return (
      <Styled.Root>
        <Styled.Wrapper>
          <Styled.Container elevation={3}>
            <LoginPage />
          </Styled.Container>
        </Styled.Wrapper>
      </Styled.Root>
    );
  }
}

export default compose<any>(withLocation)(AuthRouter);
