import { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import LanguageIcon from "@mui/icons-material/TranslateRounded";
import CheckIcon from "@mui/icons-material/CheckRounded";
export default function LanguageMenu({
  showLabel = false,
}: {
  showLabel?: boolean;
}) {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  function changeLanguage(language: string) {
    i18n.changeLanguage(language);
    setAnchorEl(null);
  }
  return (
    <>
      <button
        type="button"
        className="button button-ghost button-icon"
        aria-label={t("language")}
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        <LanguageIcon />
        {showLabel &&
          (i18n.resolvedLanguage === "tg"
            ? "TJ"
            : i18n.resolvedLanguage?.toUpperCase())}
      </button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => changeLanguage("tg")}>
          Тоҷикӣ {i18n.resolvedLanguage === "tg" && <CheckIcon />}
        </MenuItem>
        <MenuItem onClick={() => changeLanguage("ru")}>
          Русский {i18n.resolvedLanguage === "ru" && <CheckIcon />}
        </MenuItem>
        <MenuItem onClick={() => changeLanguage("en")}>
          English {i18n.resolvedLanguage === "en" && <CheckIcon />}
        </MenuItem>
      </Menu>
    </>
  );
}
