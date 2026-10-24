import { useTranslation } from "react-i18next";
import LoaderCircle from "@mui/icons-material/AutorenewRounded";
export default function PageLoading() {
  const { t } = useTranslation();
  return (
    <div role="status" aria-live="polite" className="page-loading">
      <LoaderCircle className="loading-icon" aria-hidden="true" />
      <span>{t("loading")}</span>
    </div>
  );
}
