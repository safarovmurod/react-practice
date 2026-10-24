import { getErrorMessage } from "../../token/getErrorMessage";
import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router";
import { Alert, Button, TextField, Typography } from "@mui/material";
import { axiosRequest, saveToken } from "../../token/token";
type FormProps = {
  onSwitch: () => void;
};
export default function RegisterForm({ onSwitch }: FormProps) {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  async function registerUser(user: {
    name: string;
    email: string;
    password: string;
  }) {
    try {
      setError("");
      const { data } = await axiosRequest.post("/api/auth/register", user);
      saveToken(data.accessToken, data.refreshToken);
      navigate("/dashboard");
    } catch (error) {
      setError(getErrorMessage(error, "Бақайдгирӣ нашуд. Маълумот ё пайвасти серверро санҷ."));
    }
  }
  function handleRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const user = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      password: (form.elements.namedItem("password") as HTMLInputElement).value,
    };
    registerUser(user);
  }
  return (
    <form className="auth-form auth-register-form" onSubmit={handleRegister}>
      <div className="auth-form-fields">
        <Typography component="h1" variant="h5" className="auth-form-title">
          Регистрация
        </Typography>

        <TextField
          className="auth-field"
          label="Номи бизнес"
          name="businessName"
          autoComplete="organization"
          required
          fullWidth
          variant="filled"
          slotProps={{ input: { disableUnderline: true } }}
        />

        <TextField
          className="auth-field"
          label="Ном"
          name="name"
          autoComplete="name"
          required
          fullWidth
          variant="filled"
          slotProps={{ input: { disableUnderline: true } }}
        />

        <TextField
          className="auth-field"
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
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
          autoComplete="new-password"
          required
          fullWidth
          variant="filled"
          slotProps={{
            input: { disableUnderline: true },
            htmlInput: { minLength: 6, maxLength: 128 },
          }}
        />

        <Button
          className="auth-submit"
          type="submit"
          variant="contained"
          fullWidth
        >
          Регистрация
        </Button>

        {error && <Alert severity="error">{error}</Alert>}

        <div className="auth-switch">
          <Typography variant="body2" color="text.secondary">
            акк хаст?
          </Typography>
          <Button
            className="auth-switch-button"
            type="button"
            onClick={onSwitch}
          >
            Даромадан
          </Button>
        </div>
      </div>
    </form>
  );
}
