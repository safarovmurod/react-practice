import { useUserStore } from "../../store/user";
import SettingsIcon from "@mui/icons-material/SettingsOutlined";
import { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import UserIcon from "@mui/icons-material/PersonOutlineRounded";
import EditIcon from "@mui/icons-material/EditOutlined";
import LogoutIcon from "@mui/icons-material/LogoutRounded";
import ThemeButtons from "../Profile/ThemeButtons";
export default function ProfileMenu() {
  const { t } = useTranslation();
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [tab, setTab] = useState("profile");
  return (
    <>
      <button
        type="button"
        className="button button-ghost button-icon avatar-trigger"
        aria-label={t("profile")}
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        <img src="/reference/avatar.png" alt="" />
      </button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        slotProps={{ paper: { className: "profile-dropdown" } }}
      >
        <div className="profile-menu-heading">
          <img src="/reference/avatar.png" alt="" />
          <div>
            <strong>{user?.name}</strong>
            <p>Owner</p>
          </div>
        </div>
        <div className="profile-menu-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={tab === "profile"}
            onClick={() => setTab("profile")}
          >
            <UserIcon /> {t("profile")}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "settings"}
            onClick={() => setTab("settings")}
          >
            <SettingsIcon /> {t("settings")}
          </button>
        </div>
        {tab === "profile" ? (
          <div>
            <MenuItem
              component={Link}
              to="/profile?edit=1"
              onClick={() => setAnchorEl(null)}
            >
              <EditIcon />
              {t("editProfile")}
            </MenuItem>
            <MenuItem
              component={Link}
              to="/profile"
              onClick={() => setAnchorEl(null)}
            >
              <UserIcon />
              {t("viewProfile")}
            </MenuItem>
            <MenuItem
              component={Link}
              to="/profile"
              onClick={() => setAnchorEl(null)}
            >
              <UserIcon />
              {t("socialProfile")}
            </MenuItem>
            <MenuItem onClick={() => logout().catch(console.error)}>
              <LogoutIcon />
              {t("logout")}
            </MenuItem>
          </div>
        ) : (
          <div>
            <p className="profile-theme-title">{t("themeMode")}</p>
            <ThemeButtons />
            <MenuItem
              component="a"
              href="https://phoenixcoded.authordesk.app/"
              target="_blank"
              rel="noreferrer"
            >
              {t("support")}
            </MenuItem>
            <MenuItem>{t("privacyCenter")}</MenuItem>
          </div>
        )}
      </Menu>
    </>
  );
}
