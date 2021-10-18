import * as React from "react";
import * as Styled from "./styled";
import { Button, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
type Props = {
  onSubmit: (data: any) => any;
  submitting: boolean;
};

const RegisterForm: React.FC<Props> = ({ onSubmit, submitting }) => {
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm();

  const submit = (data: any) => {
    console.log(data);
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
      return "";
    }
  };

  return (
    <Styled.Form onSubmit={handleSubmit(submit)}>
      <Styled.InputRow>
        <Controller
          name={"username"}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              type={"text"}
              label={"Username"}
              disabled={submitting}
              error={!!errors.username}
              helperText={getError("username")}
            />
          )}
        />
      </Styled.InputRow>
      <Styled.InputRow>
        <Controller
          name={"first_name"}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              type={"text"}
              label={"First name"}
              disabled={submitting}
              error={!!errors.first_name}
              helperText={getError("first_name")}
            />
          )}
        />
      </Styled.InputRow>
      <Styled.InputRow>
        <Controller
          name={"last_name"}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              type={"text"}
              label={"Last name"}
              disabled={submitting}
              error={!!errors.last_name}
              helperText={getError("last_name")}
            />
          )}
        />
      </Styled.InputRow>
      <Styled.InputRow>
        <Controller
          name={"email"}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              type={"email"}
              label={"Email"}
              disabled={submitting}
              error={!!errors.email}
              helperText={getError("email")}
            />
          )}
        />
      </Styled.InputRow>
      <Styled.InputRow>
        <Controller
          name={"password"}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              type={"password"}
              label={"Password"}
              disabled={submitting}
              error={!!errors.password}
              helperText={getError("password")}
            />
          )}
        />
      </Styled.InputRow>
      <Styled.InputRow>
        <Controller
          name={"password2"}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              type={"password"}
              disabled={submitting}
              label={"Password confirmation"}
              error={!!errors.password2}
              helperText={getError("password2")}
            />
          )}
        />
      </Styled.InputRow>
      <Styled.InputRow>
        <Button
          fullWidth
          size={"small"}
          color={"success"}
          variant={"contained"}
          type={"submit"}
          disabled={submitting}
        >
          Register
        </Button>
      </Styled.InputRow>
    </Styled.Form>
  );
};

export default RegisterForm;
