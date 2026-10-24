import { Link } from "react-router";
import LogIn from "@mui/icons-material/LoginRounded";
import Sun from "@mui/icons-material/LightModeRounded";
import { useTranslation } from "react-i18next";
import LanguageMenu from "../Shared/LanguageMenu";
export default function HomeHeader() {
  const { t } = useTranslation();
  return (
    <header className="home-header">
      <Link to="/" className="home-logo">
        <img src="/reference/logo.svg" alt="" />
        <strong>Adl 5:8</strong>
      </Link>
      <nav>
        <LanguageMenu showLabel />
        <button
          type="button"
          className="home-theme"
          aria-label={t("themeMode")}
          onClick={() => document.documentElement.classList.toggle("dark")}
        >
          <Sun />
        </button>
        <Link to="/register" className="home-register">
          {t("register")}
        </Link>
        <Link to="/login" className="home-login">
          <LogIn />
          {t("login")}
        </Link>
      </nav>
    </header>
  );
}
