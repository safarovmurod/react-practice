import { useUserStore } from "../../store/user";
import { Link, NavLink } from "react-router";
import { useTranslation } from "react-i18next";
import Archive from "@mui/icons-material/Inventory2Outlined";
import ChevronRight from "@mui/icons-material/ChevronRight";
import Folder from "@mui/icons-material/FolderOutlined";
import LayoutDashboard from "@mui/icons-material/GridViewRounded";
import Users from "@mui/icons-material/PeopleAltRounded";
import Wallet from "@mui/icons-material/AccountBalanceWalletRounded";
export default function Sidebar() {
  const { t } = useTranslation();
  const user = useUserStore((state) => state.user);
  return (
    <aside className="sidebar">
      <Link to="/dashboard" className="sidebar-logo" aria-label="Adl 5:8">
        <img src="/reference/logo.svg" alt="Adl 5:8" />
      </Link>
      <p className="sidebar-caption">ADL 5:8</p>
      <nav className="sidebar-links" aria-label={t("menu")}>
        <NavLink to="/dashboard">
          <LayoutDashboard />
          <span>{t("dashboard")}</span>
        </NavLink>
        <NavLink to="/debts">
          <Wallet />
          <span>{t("debts")}</span>
        </NavLink>
        <NavLink to="/archive">
          <Archive />
          <span>{t("archive")}</span>
        </NavLink>
        <NavLink to="/contacts">
          <Users />
          <span>{t("contacts")}</span>
        </NavLink>
        <NavLink to="/folders">
          <Folder />
          <span>{t("folders")}</span>
        </NavLink>
      </nav>
      <Link to="/profile" className="sidebar-profile">
        <img src="/reference/sidebar-avatar.png" alt="" />
        <div>
          <strong>{user?.name}</strong>
          <span>Owner</span>
        </div>
        <ChevronRight />
      </Link>
    </aside>
  );
}
