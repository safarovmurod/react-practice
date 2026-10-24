import Menu from "@mui/icons-material/MenuRounded";
import Maximize from "@mui/icons-material/OpenInFullRounded";
import Check from "@mui/icons-material/CheckRounded";
import { useTranslation } from "react-i18next";
import LanguageMenu from "../Shared/LanguageMenu";
import ProfileMenu from "./ProfileMenu";
import NotificationsMenu from "./NotificationsMenu";
type Props = {
  onMenuClick: () => void;
};
export default function Header({ onMenuClick }: Props) {
  const { t } = useTranslation();
  return (
    <header className="header">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label={t("menu")}
        className="button button-ghost button-icon drawer-toggle"
      >
        <Menu />
      </button>
      <div className="header-right">
        <LanguageMenu />
        <span className="sync" title={t("synced")}>
          <Check />
        </span>
        <NotificationsMenu />
        <span className="fullscreen" aria-hidden="true">
          <Maximize />
        </span>
        <ProfileMenu />
      </div>
    </header>
  );
}
