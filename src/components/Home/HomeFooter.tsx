import { useTranslation } from "react-i18next";
export default function HomeFooter() {
  const { t } = useTranslation();
  return (
    <footer className="home-footer">
      <div className="home-footer-grid">
        <div>
          <strong>Adl 5:8</strong>
          <p>{t("homeFooterIntro")}</p>
        </div>
        <div>
          <h3>{t("product")}</h3>
          <p>{t("features")}</p>
          <p>{t("dashboard")}</p>
          <p>{t("analytics")}</p>
          <p>{t("contacts")}</p>
        </div>
        <div>
          <h3>{t("company")}</h3>
          <p>{t("about")}</p>
          <p>{t("blog")}</p>
          <p>{t("careers")}</p>
          <p>{t("press")}</p>
        </div>
        <div>
          <h3>{t("support")}</h3>
          <p>{t("documentation")}</p>
          <p>{t("helpCenter")}</p>
          <p>{t("contactUs")}</p>
          <p>{t("status")}</p>
        </div>
      </div>
      <div className="home-footer-bottom">
        <span>© 2026 DebtBook. {t("allRightsReserved")}</span>
        <div>
          <span>{t("privacy")}</span>
          <span>{t("terms")}</span>
          <span>Cookies</span>
        </div>
      </div>
    </footer>
  );
}
