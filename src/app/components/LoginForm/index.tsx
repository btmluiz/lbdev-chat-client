import React from "react";
import * as Styled from "@components/LoginForm/styled";
import { Button, Divider, TextField, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";

type Props = {
  onSubmit: (data: any) => any;
};

const LoginForm: React.FC<Props> = ({ onSubmit }) => {
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm();

  const submit = (data: any) => {
    const response = onSubmit(data);
    Promise.resolve(response).then((res: any) => {
      if (res) {
        Object.keys(res).forEach((value) => {
          setError(value, { message: res[value] });
        });
      }
    });
  };

  const getError = (field: string) => {
    if (errors[field] && errors[field].message) {
      return errors[field].message;
    } else {
      return " ";
    }
  };

  return (
    <Styled.Form onSubmit={handleSubmit(submit)}>
      <Styled.Header>
        <Typography>LoginPage</Typography>
      </Styled.Header>
      <Divider />
      <Styled.Body>
        <Styled.InputRow>
          <Controller
            name={"username"}
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type={"text"}
                label={"Username"}
                error={!!errors.username}
                helperText={getError("username")}
              />
            )}
          />
        </Styled.InputRow>
        <Styled.InputRow>
          <Controller
            name={"password"}
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type={"password"}
                label={"Password"}
                error={!!errors.password}
                helperText={getError("password")}
              />
            )}
          />
        </Styled.InputRow>
        <Styled.ButtonGroup>
          <Styled.LeftButton>
            <Button size={"small"} variant={"text"}>
              Forgot password
            </Button>
          </Styled.LeftButton>
          <Styled.RightButton>
            <Button size={"small"} variant={"text"}>
              Signup
            </Button>
          </Styled.RightButton>
        </Styled.ButtonGroup>
        <Styled.ButtonGroup>
          <Button
            fullWidth
            size={"small"}
            color={"success"}
            variant={"contained"}
            type={"submit"}
          >
            Login
          </Button>
        </Styled.ButtonGroup>
      </Styled.Body>
    </Styled.Form>
  );
};

export default LoginForm;
