import { useUserStore } from "../store/user";
import { useTranslation } from "react-i18next";
import BalanceSummary from "../components/Dashboard/BalanceSummary";
import DebtChart from "../components/Dashboard/DebtChart";
import RecentPayments from "../components/Dashboard/RecentPayments";
export default function DashboardPage() {
  const { t } = useTranslation();
  const user = useUserStore((state) => state.user);
  return (
    <div className="dashboard">
      <h1 className="mobile-page-title">{t("dashboard")}</h1>
      <h1 className="welcome">
        {t("welcomeUser", { name: user?.name || "" })}
      </h1>

      <BalanceSummary />
      <div className="dashboard-content">
        <DebtChart />

        <RecentPayments />
      </div>
    </div>
  );
}
