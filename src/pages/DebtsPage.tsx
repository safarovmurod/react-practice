import { useState } from "react";
import { useTranslation } from "react-i18next";
import BalanceSummary from "../components/Dashboard/BalanceSummary";
import DebtsTable from "../components/Debts/DebtsTable";
import QuickPaymentMenu from "../components/Debts/QuickPaymentMenu";
import ExportMenu from "../components/Debts/ExportMenu";
export default function DebtsPage() {
  const { t } = useTranslation();
  const [direction, setDirection] = useState("");
  return (
    <div className="page debts-page">
      <h1 className="mobile-page-title">{t("debts")}</h1>
      <div className="page-title debt-title">
        <h1>Adl 5:8</h1>
        <div className="page-buttons">
          <ExportMenu />

          <QuickPaymentMenu />
        </div>
      </div>

      <BalanceSummary direction={direction} onDirection={setDirection} />
      <div className="section-divider" />

      <DebtsTable direction={direction} />
    </div>
  );
}
