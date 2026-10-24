import { isRouteErrorResponse, Link, useRouteError } from "react-router";
import { useTranslation } from "react-i18next";
import ErrorOutline from "@mui/icons-material/ErrorOutlineRounded";
import NotFoundPage from "../../pages/NotFoundPage";
export default function ErrorBoundary() {
  const error = useRouteError();
  const { t } = useTranslation();
  if (isRouteErrorResponse(error) && error.status === 404) {
    return <NotFoundPage />;
  }
  return (
    <main className="error-page">
      <section className="error-card surface" aria-labelledby="error-title">
        <ErrorOutline className="error-icon" aria-hidden="true" />
        <h1 id="error-title">{t("errorPageTitle")}</h1>
        <p>{t("errorPageDescription")}</p>
        <div className="error-actions">
          <button
            type="button"
            className="button"
            onClick={() => window.location.reload()}
          >
            {t("reloadPage")}
          </button>
          <Link className="button button-outline" to="/" replace>
            {t("backHome")}
          </Link>
        </div>
      </section>
    </main>
  );
}
