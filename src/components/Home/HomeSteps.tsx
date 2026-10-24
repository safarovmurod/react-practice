import { useTranslation } from "react-i18next";
export default function HomeSteps() {
  const { t } = useTranslation();
  return (
    <section className="home-section home-steps">
      <p className="section-eyebrow">{t("howItWorks")}</p>
      <h2>{t("stepsHeading")}</h2>
      <div className="home-steps-grid">
        <article>
          <span>01</span>
          <h3>{t("createAccount")}</h3>
          <p>{t("stepOneText")}</p>
        </article>
        <article>
          <span>02</span>
          <h3>{t("addDebts")}</h3>
          <p>{t("stepTwoText")}</p>
        </article>
        <article>
          <span>03</span>
          <h3>{t("trackProgress")}</h3>
          <p>{t("stepThreeText")}</p>
        </article>
        <article>
          <span>04</span>
          <h3>{t("stayOrganized")}</h3>
          <p>{t("stepFourText")}</p>
        </article>
      </div>
    </section>
  );
}
