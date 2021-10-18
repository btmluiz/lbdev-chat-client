import React from "react";
import * as Styled from "@components/LoginForm/styled";
import { Button, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@hooks/navigate";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";

type Props = {
  onSubmit: (data: any) => any;
  submitting: boolean;
  register: boolean;
  setRegister: (value: boolean) => void;
};

const LoginForm: React.FC<Props> = ({
  onSubmit,
  submitting,
  register,
  setRegister,
}) => {
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
      return "";
    }
  };

  return (
    <AnimateSharedLayout>
      <Styled.Form onSubmit={handleSubmit(submit)}>
        <Styled.InputRow>
          <Controller
            name={"username"}
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <motion.div>
                <TextField
                  {...field}
                  fullWidth
                  type={"text"}
                  label={"Username"}
                  error={!!errors.username}
                  helperText={getError("username")}
                />
              </motion.div>
            )}
          />
        </Styled.InputRow>
        <motion.div layout>
          <AnimatePresence>
            {register ? (
              <motion.div
                layout
                initial={{ height: 0 }}
                animate={{ height: "auto", overflow: "hidden" }}
                exit={{ height: 0 }}
                transition={{ duration: 0.9 }}
              >
                <Styled.InputRow
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
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
                <Styled.InputRow
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                >
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
                <Styled.InputRow
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9 }}
                >
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
              </motion.div>
            ) : undefined}
          </AnimatePresence>
        </motion.div>
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

        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto", overflow: "hidden" }}
          exit={{ height: 0 }}
          transition={{ duration: 2 }}
        >
          {!register && (
            <Styled.ButtonGroup>
              <Styled.LeftButton>
                <Button size={"small"} variant={"text"}>
                  Forgot password
                </Button>
              </Styled.LeftButton>
              <Styled.RightButton>
                <Button
                  size={"small"}
                  variant={"text"}
                  onClick={() => setRegister(true)}
                >
                  <motion.div
                    layoutId={"register"}
                    className="outline"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                  >
                    Register
                  </motion.div>
                </Button>
              </Styled.RightButton>
            </Styled.ButtonGroup>
          )}
        </motion.div>
        <Styled.ButtonGroup>
          <Button
            fullWidth
            size={"small"}
            color={"success"}
            variant={"contained"}
            type={"submit"}
          >
            {register ? (
              <motion.div
                layoutId={"register"}
                className="outline"
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
              >
                Register
              </motion.div>
            ) : (
              "Login"
            )}
          </Button>
        </Styled.ButtonGroup>
      </Styled.Form>
    </AnimateSharedLayout>
  );
};

export default LoginForm;
