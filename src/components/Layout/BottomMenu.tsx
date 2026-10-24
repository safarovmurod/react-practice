import { NavLink } from "react-router";
import Archive from "@mui/icons-material/Inventory2Outlined";
import Folder from "@mui/icons-material/FolderOutlined";
import LayoutDashboard from "@mui/icons-material/GridViewRounded";
import User from "@mui/icons-material/PersonOutlineRounded";
import Wallet from "@mui/icons-material/AccountBalanceWalletRounded";
import { useTranslation } from "react-i18next";
export default function BottomMenu() {
  const { t } = useTranslation();
  return (
    <nav className="bottom-menu" aria-label={t("bottomMenu")}>
      <NavLink to="/dashboard" aria-label={t("dashboard")}>
        <LayoutDashboard />
      </NavLink>
      <NavLink to="/debts" aria-label={t("debts")}>
        <Wallet />
      </NavLink>
      <NavLink to="/folders" aria-label={t("folders")}>
        <Folder />
      </NavLink>
      <NavLink to="/archive" aria-label={t("archive")}>
        <Archive />
      </NavLink>
      <NavLink to="/profile" aria-label={t("profile")}>
        <User />
      </NavLink>
    </nav>
  );
}
