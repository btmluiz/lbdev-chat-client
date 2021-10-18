import * as React from "react";
import * as Styled from "./styled";
import { compose } from "redux";
import LoginForm from "@components/LoginForm";
import AuthService from "@services/auth";
import { withNavigation } from "@hooks/navigate";
import { NavigationProps } from "@services/navigation";
import { Divider, IconButton, Typography } from "@mui/material";
import { Route } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";

type Props = NavigationProps & {};
type State = {
  error?: string;
  register: boolean;
};

class LoginPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      error: undefined,
      register: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.setRegister = this.setRegister.bind(this);
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
      if (error.data && error.data.non_field_errors) {
        return {
          username: error.data.non_field_errors[0],
          password: error.data.non_field_errors[0],
        };
      } else {
        return error.data;
      }
    }
  }

  setRegister = (value: boolean) => {
    this.setState({
      register: value,
    });
  };

  render() {
    const {
      props: { navigate },
      state: { register, error },
      setRegister,
    } = this;

    if (AuthService.token) {
      navigate("/chat");
    }

    return (
      <Styled.Root>
        <Styled.Header>
          {register ? (
            <>
              <IconButton size={"small"} onClick={() => setRegister(false)}>
                <ArrowBack />
              </IconButton>
              <Typography>Chat System - Register</Typography>
            </>
          ) : (
            <Typography>LoginPage</Typography>
          )}
        </Styled.Header>
        <Divider />
        <Styled.Body>
          <LoginForm
            onSubmit={this.handleSubmit}
            submitting={false}
            register={register}
            setRegister={setRegister}
          />
        </Styled.Body>
      </Styled.Root>
    );
  }
}

export default compose<any>(withNavigation)(LoginPage);
