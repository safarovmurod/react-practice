import { Link } from "react-router";
import { useTranslation } from "react-i18next";
export default function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <main className="error-page">
      <section className="error-card surface" aria-labelledby="not-found-title">
        <p className="error-code" aria-hidden="true">
          404
        </p>
        <h1 id="not-found-title">{t("notFoundTitle")}</h1>
        <p>{t("notFoundDescription")}</p>
        <Link className="button" to="/" replace>
          {t("backHome")}
        </Link>
      </section>
    </main>
  );
}
