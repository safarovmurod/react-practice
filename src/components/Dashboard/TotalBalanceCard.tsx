import { useDebtStore } from "../../store/debts";
import Wallet from "@mui/icons-material/AccountBalanceWalletRounded";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { axiosRequest } from "../../token/token";
export default function TotalBalanceCard({
  active = true,
  onClick,
}: {
  active?: boolean;
  onClick?: () => void;
}) {
  const { t } = useTranslation();
  const debts = useDebtStore((state) => state.debts);
  const [totalBalance, setTotalBalance] = useState(0);
  async function getTotalBalance() {
    try {
      const { data } = await axiosRequest.get("/api/dashboard/summary");
      setTotalBalance(data.outstanding.net_balance);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getTotalBalance();
  }, [debts]);
  return (
    <button
      type="button"
      className={"balance-card" + (active ? " total" : "")}
      aria-pressed={active}
      onClick={onClick}
    >
      <span className="balance-icon orange">
        <Wallet />
      </span>
      <div className="balance-text">
        <p className="balance-label">{t("total")}</p>
        <p className="balance-amount orange">
          <strong>{totalBalance}</strong>
          <span>TJS</span>
        </p>
      </div>
    </button>
  );
}
