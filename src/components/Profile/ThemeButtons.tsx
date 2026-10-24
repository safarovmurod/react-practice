import { useTranslation } from "react-i18next"
import Sun from "@mui/icons-material/LightModeRounded"
import Moon from "@mui/icons-material/DarkModeRounded"
import Settings from "@mui/icons-material/SettingsRounded"
import { useThemeStore } from "../../store/theme"
export default function ThemeButtons() {
   const { t } = useTranslation()
   const theme = useThemeStore((state) => state.theme)
   const changeTheme = useThemeStore((state) => state.changeTheme)
   return (
      <div className="theme-buttons">
         <button
            type="button"
            aria-pressed={theme === "light"}
            onClick={() => changeTheme("light")}
         >
            <span>
               <Sun />
            </span>
            {t("light")}
         </button>
         <button type="button" aria-pressed={theme === "dark"} onClick={() => changeTheme("dark")}>
            <span>
               <Moon />
            </span>
            {t("dark")}
         </button>
         <button type="button" aria-pressed={theme === "auto"} onClick={() => changeTheme("auto")}>
            <span>
               <Settings />
            </span>
            {t("auto")}
         </button>
      </div>
   )
}
