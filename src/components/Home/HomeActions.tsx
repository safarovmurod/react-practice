import { Link } from "react-router";
import { useTranslation } from "react-i18next";
export default function HomeActions() {
  const { t } = useTranslation();
  return (
    <section className="home-cta home-section">
      <h2>{t("ctaHeading")}</h2>
      <p>{t("ctaText")}</p>
      <div className="home-hero-actions">
        <Link to="/register" className="home-primary">
          {t("startFree")}
        </Link>
        <Link to="/login">{t("login")}</Link>
      </div>
    </section>
  );
}
