import { getErrorMessage } from "../../token/getErrorMessage";
import type { FormEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Alert, Button, TextField, Typography } from "@mui/material";
import { axiosRequest, saveToken } from "../../token/token";
type FormProps = {
  onSwitch: () => void;
};
export default function LoginForm({ onSwitch }: FormProps) {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  async function loginUser(user: { email: string; password: string }) {
    try {
      setError("");
      const { data } = await axiosRequest.post("/api/auth/login", user);
      saveToken(data.accessToken, data.refreshToken);
      navigate("/dashboard");
    } catch (error) {
      setError(getErrorMessage(error, "Даромадан нашуд. Email, парол ё пайвасти серверро санҷ."));
    }
  }
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const user = {
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      password: (form.elements.namedItem("password") as HTMLInputElement).value,
    };
    loginUser(user);
  }
  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="auth-form-fields">
        <Typography component="h1" variant="h5" className="auth-form-title">
          Login
        </Typography>

        <TextField
          className="auth-field"
          label="Email"
          type="email"
          name="email"
          autoComplete="username"
          required
          fullWidth
          variant="filled"
          slotProps={{ input: { disableUnderline: true } }}
        />

        <TextField
          className="auth-field"
          label="Пароль"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          fullWidth
          variant="filled"
          slotProps={{ input: { disableUnderline: true } }}
        />

        <Button
          className="auth-submit"
          type="submit"
          variant="contained"
          fullWidth
        >
          Даромадан
        </Button>

        {error && <Alert severity="error">{error}</Alert>}

        <div className="auth-switch">
          <Button
            className="auth-switch-button"
            type="button"
            onClick={onSwitch}
          >
            Регистрация
          </Button>
        </div>
      </div>
    </form>
  );
}
