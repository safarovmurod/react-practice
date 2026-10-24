import { Link } from "react-router";
import ArrowRight from "@mui/icons-material/ArrowForwardRounded";
import { useTranslation } from "react-i18next";
export default function HomeHero() {
  const { t } = useTranslation();
  return (
    <section className="home-hero">
      <p className="home-eyebrow">● {t("homeEyebrow")}</p>
      <h1>
        {t("homeHeadline")}
        <br />
        <span>{t("homeHeadlineSecond")}</span>
      </h1>
      <p className="home-intro">{t("homeIntro")}</p>
      <div className="home-hero-actions">
        <Link to="/register" className="home-primary">
          {t("startFree")}
          <ArrowRight />
        </Link>
        <Link to="/register">{t("createAccount")}</Link>
      </div>
      <div className="home-tags">
        <span>{t("offline")}</span>
        <span>{t("multilingual")}</span>
        <span>{t("synchronization")}</span>
        <span>{t("secure")}</span>
      </div>
    </section>
  );
}
