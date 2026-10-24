import Wallet from "@mui/icons-material/AccountBalanceWalletRounded";
import Users from "@mui/icons-material/PeopleAltRounded";
import WifiOff from "@mui/icons-material/WifiOffRounded";
import ChartNoAxesCombined from "@mui/icons-material/ShowChartRounded";
import ShieldCheck from "@mui/icons-material/VerifiedUserOutlined";
import Languages from "@mui/icons-material/TranslateRounded";
import { useTranslation } from "react-i18next";
function DebtFeature() {
  const { t } = useTranslation();
  return (
    <article className="home-feature">
      <span>
        <Wallet />
      </span>
      <h3>{t("debtBook")}</h3>
      <p>{t("debtBookText")}</p>
    </article>
  );
}
function ContactsFeature() {
  const { t } = useTranslation();
  return (
    <article className="home-feature">
      <span>
        <Users />
      </span>
      <h3>{t("contactManager")}</h3>
      <p>{t("contactManagerText")}</p>
    </article>
  );
}
function OfflineFeature() {
  const { t } = useTranslation();
  return (
    <article className="home-feature">
      <span>
        <WifiOff />
      </span>
      <h3>{t("offline")}</h3>
      <p>{t("offlineText")}</p>
    </article>
  );
}
function AnalyticsFeature() {
  const { t } = useTranslation();
  return (
    <article className="home-feature">
      <span>
        <ChartNoAxesCombined />
      </span>
      <h3>{t("analytics")}</h3>
      <p>{t("analyticsText")}</p>
    </article>
  );
}
function SecurityFeature() {
  const { t } = useTranslation();
  return (
    <article className="home-feature">
      <span>
        <ShieldCheck />
      </span>
      <h3>{t("securePrivate")}</h3>
      <p>{t("securePrivateText")}</p>
    </article>
  );
}
function LanguagesFeature() {
  const { t } = useTranslation();
  return (
    <article className="home-feature">
      <span>
        <Languages />
      </span>
      <h3>{t("multilingual")}</h3>
      <p>{t("multilingualText")}</p>
    </article>
  );
}
export default function HomeFeatures() {
  const { t } = useTranslation();
  return (
    <section className="home-features home-section">
      <p className="section-eyebrow">{t("features")}</p>
      <h2>{t("featuresHeading")}</h2>
      <div className="home-feature-grid">
        <DebtFeature />
        <ContactsFeature />
        <OfflineFeature />
        <AnalyticsFeature />
        <SecurityFeature />
        <LanguagesFeature />
      </div>
    </section>
  );
}
