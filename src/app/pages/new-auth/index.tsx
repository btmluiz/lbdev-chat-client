import * as React from "react";
import * as Styled from "./styled";

type Props = {};
type State = {};

class NewAuthPage extends React.Component<Props, State> {
  render() {
    return (
      <Styled.Root>
        <Styled.RootWrapper>
          <Styled.ViewContainer>
            <Styled.ViewContainerWrapper />
          </Styled.ViewContainer>
          <Styled.AuthContainer>Auth</Styled.AuthContainer>
        </Styled.RootWrapper>
      </Styled.Root>
    );
  }
}

export default NewAuthPage;
