import { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import BellIcon from "@mui/icons-material/NotificationsRounded";
export default function NotificationsMenu() {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [read, setRead] = useState(false);
  return (
    <>
      <button
        type="button"
        className="button button-ghost button-icon notification"
        aria-label={t("notifications")}
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        <BellIcon />
        {!read && <span>1</span>}
      </button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <h3 className="menu-heading">{t("notifications")}</h3>
        <button
          type="button"
          className="mark-read"
          onClick={() => setRead(true)}
        >
          {t("markAllRead")}
        </button>
        <MenuItem
          component={Link}
          to="/profile"
          onClick={() => setAnchorEl(null)}
          className="notification-message"
        >
          <strong>{t("actionRequired")}</strong>
          <span>{t("addProfileEmail")}</span>
        </MenuItem>
      </Menu>
    </>
  );
}
