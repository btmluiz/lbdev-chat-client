import React from "react";
import { compose } from "redux";
import * as Styled from "./styled";
import LoginForm from "@components/LoginForm";
import AuthService from "@services/auth";
import { withNavigation } from "@hooks/navigate";
import { NavigationProps } from "@services/navigation";

type Props = NavigationProps & {};
type State = {
  error?: string;
};

class LoginPage extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(form: any) {
    const { navigate } = this.props;

    console.log(AuthService);
    try {
      const response = await AuthService.login(form.username, form.password);
      console.log("t");
      const { data } = response;
      if (data.token) {
        AuthService.setToken(data.token);
        navigate("/chat");
      } else {
        return data;
      }
    } catch (error: any) {
      console.log(error);
      if (error.data && error.data.non_field_errors) {
        return {
          username: error.data.non_field_errors[0],
          password: error.data.non_field_errors[0],
        };
      }
    }
  }

  render() {
    const { navigate } = this.props;

    if (AuthService.token) {
      navigate("/chat");
    }

    return (
      <Styled.Root>
        <Styled.Container elevation={3}>
          <LoginForm onSubmit={this.handleSubmit} />
        </Styled.Container>
      </Styled.Root>
    );
  }
}

export default compose<any>(withNavigation)(LoginPage);
