import { useState } from "react";
import { Paper, Typography } from "@mui/material";
import LoginForm from "../components/Auth/LoginForm";
import RegisterForm from "../components/Auth/RegisterForm";
type AuthPageProps = {
  initialRegister?: boolean;
};
export default function AuthPage({ initialRegister = false }: AuthPageProps) {
  const [isRegister, setIsRegister] = useState(initialRegister);
  const pageClass = isRegister ? "auth-page is-register" : "auth-page is-login";
  return (
    <main className={pageClass}>
      <Paper component="section" elevation={0} className="auth-card">
        <div className="auth-background" aria-hidden="true" />

        <div className="auth-brand">
          <Typography component="p" className="auth-brand-name">
            Adl 5:8
          </Typography>
          <Typography variant="body2" className="auth-brand-text">
            Ҳисоби қарзҳо, осонтар.
          </Typography>
        </div>

        <div className="auth-form-panel">
          <div
            key={isRegister ? "register" : "login"}
            className="auth-form-content"
          >
            {isRegister ? (
              <RegisterForm onSwitch={() => setIsRegister(false)} />
            ) : (
              <LoginForm onSwitch={() => setIsRegister(true)} />
            )}
          </div>
        </div>
      </Paper>
    </main>
  );
}
