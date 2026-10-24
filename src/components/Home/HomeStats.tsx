import { useTranslation } from "react-i18next";
export default function HomeStats() {
  const { t } = useTranslation();
  return (
    <section className="home-stats">
      <div>
        <strong>10K+</strong>
        <h3>{t("activeUsers")}</h3>
        <p>{t("activeUsersText")}</p>
      </div>
      <div>
        <strong>50K+</strong>
        <h3>{t("trackedDebts")}</h3>
        <p>{t("trackedDebtsText")}</p>
      </div>
      <div>
        <strong>99.9%</strong>
        <h3>{t("uptime")}</h3>
        <p>{t("uptimeText")}</p>
      </div>
      <div>
        <strong>3</strong>
        <h3>{t("languages")}</h3>
        <p>EN · RU · TG</p>
      </div>
    </section>
  );
}
