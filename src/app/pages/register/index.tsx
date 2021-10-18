import * as React from "react";
import * as Styled from "./styled";
import RegisterForm from "@components/RegisterForm";
import { compose } from "redux";
import AuthService from "@services/auth";
import { motion } from "framer-motion";
import { Divider, IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { withNavigation } from "@hooks/navigate";
import { NavigationProps } from "@services/navigation";

type Props = NavigationProps & {};
type State = {
  submitting: boolean;
  message?: string;
};

class RegisterPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      submitting: false,
      message: undefined,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(form: any) {
    this.setState({ submitting: true });
    try {
      const response = await AuthService.register(
        form.username,
        form.first_name,
        form.last_name,
        form.email,
        form.password,
        form.password2
      );
      const { data } = response;

      this.setState({ submitting: false, message: data.message });

      return data;
    } catch (error: any) {
      this.setState({ submitting: false });
      if (error.data && error.data.non_field_errors) {
        return {
          form: error.data.non_field_errors[0],
        };
      } else {
        return error.data;
      }
    }
  }

  render() {
    const {
      props: { navigate },
      state: { submitting, message },
    } = this;

    return (
      <Styled.Root
        // initial={{ scaleY: 0 }}
        // animate={{ scaleY: 1 }}
        // exit={{ scaleY: 0 }}
        initial={{ x: "100vw" }}
        animate={{ x: 0 }}
        exit={{ x: "100vw" }}
        transition={{ duration: 0.5 }}
      >
        <Styled.Header>
          <IconButton size={"small"} onClick={() => navigate("/login")}>
            <ArrowBack />
          </IconButton>
          Chat System - Register
        </Styled.Header>
        <Divider />
        <Styled.Body>
          {message ? (
            <motion.div>
              <Styled.MessageResponse>{message}</Styled.MessageResponse>
            </motion.div>
          ) : (
            <motion.div>
              <RegisterForm
                onSubmit={this.handleSubmit}
                submitting={submitting}
              />
            </motion.div>
          )}
        </Styled.Body>
      </Styled.Root>
    );
  }
}

export default compose<any>(withNavigation)(RegisterPage);
