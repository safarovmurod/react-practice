import { useUserStore } from "../../store/user";
import { useThemeStore } from "../../store/theme";
import { Alert } from "@mui/material";
import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useSearchParams } from "react-router";
import ChevronRight from "@mui/icons-material/ChevronRight";
import Languages from "@mui/icons-material/TranslateRounded";
import LogOut from "@mui/icons-material/LogoutRounded";
import Moon from "@mui/icons-material/DarkModeOutlined";
import Pencil from "@mui/icons-material/EditOutlined";
import Users from "@mui/icons-material/PeopleAltRounded";
import { useTranslation } from "react-i18next";
import FormInput from "../Shared/FormInput";
export default function ProfileContent() {
  const { t, i18n } = useTranslation();
  const [params] = useSearchParams();
  const [editing, setEditing] = useState(params.has("edit"));
  const [error, setError] = useState("");
  const user = useUserStore((state) => state.user);
  const updateName = useUserStore((state) => state.updateName);
  const logout = useUserStore((state) => state.logout);
  const theme = useThemeStore((state) => state.theme);
  const changeTheme = useThemeStore((state) => state.changeTheme);
  async function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("profile-username") || "");
    setError("");
    try {
      await updateName(name);
      setEditing(false);
    } catch {
      setError(t("saveFailed"));
    }
  }
  let isDark = theme === "dark";
  if (theme === "auto") {
    isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  return (
    <div className="page profile-page">
      <h1 className="mobile-page-title">{t("profile")}</h1>
      <div className="page-title">
        <h1>{t("profile")}</h1>
      </div>
      <section className="surface profile-summary">
        <img
          src="/reference/avatar.png"
          alt=""
          className="profile-large-avatar"
        />
        {editing ? (
          <form className="profile-edit-form" onSubmit={saveProfile}>
            <FormInput
              label={t("username")}
              name="profile-username"
              defaultValue={user?.name || ""}
              required
            />
            <p>{user?.email}</p>
            <div className="page-buttons">
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="button button-outline"
              >
                {t("cancel")}
              </button>
              <button type="submit" className="button">
                {t("save")}
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="profile-display-name">
              <strong>{user?.name}</strong>
              <button
                type="button"
                onClick={() => setEditing(true)}
                aria-label={t("editProfile")}
                className="button button-ghost button-icon"
              >
                <Pencil />
              </button>
            </div>
            <span className="owner-badge">Owner</span>
          </>
        )}
      </section>
      {error && <Alert severity="error">{error}</Alert>}
      <Link to="/contacts" className="surface profile-contact-link">
        <span className="profile-contact-icon">
          <Users />
        </span>
        <div>
          <strong>{t("contacts")}</strong>
          <p>{t("manageContacts")}</p>
        </div>
        <ChevronRight />
      </Link>
      <section className="surface profile-settings">
        <h2>{t("settings")}</h2>
        <div className="settings-body">
          <label className="theme-switch">
            <Moon />
            <span>{t("darkMode")}</span>
            <input
              type="checkbox"
              aria-label={t("darkMode")}
              checked={isDark}
              onChange={(event) =>
                changeTheme(event.target.checked ? "dark" : "light")
              }
            />
          </label>
          <p className="language-heading">
            <Languages />
            {t("language")}
          </p>
          <div className="language-buttons">
            <button
              type="button"
              className={i18n.resolvedLanguage === "en" ? "selected" : ""}
              onClick={() => i18n.changeLanguage("en")}
            >
              GB English
            </button>
            <button
              type="button"
              className={i18n.resolvedLanguage === "ru" ? "selected" : ""}
              onClick={() => i18n.changeLanguage("ru")}
            >
              RU Русский
            </button>
            <button
              type="button"
              className={i18n.resolvedLanguage === "tg" ? "selected" : ""}
              onClick={() => i18n.changeLanguage("tg")}
            >
              TJ Тоҷикӣ
            </button>
          </div>
        </div>
      </section>
      <button
        className="button button-outline logout-button"
        onClick={() => logout().catch(console.error)}
      >
        <LogOut data-icon="inline-start" />
        {t("logout")}
      </button>
    </div>
  );
}
