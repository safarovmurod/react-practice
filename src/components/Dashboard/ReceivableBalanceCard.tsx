import { useDebtStore } from "../../store/debts";
import CreditCard from "@mui/icons-material/CreditCardRounded";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { axiosRequest } from "../../token/token";
export default function ReceivableBalanceCard({
  active = false,
  onClick,
}: {
  active?: boolean;
  onClick?: () => void;
}) {
  const { t } = useTranslation();
  const debts = useDebtStore((state) => state.debts);
  const [receivableBalanceCard, setReceivableBalanceCard] = useState(0);
  async function getReceivableBalance() {
    try {
      const { data } = await axiosRequest.get("/api/dashboard/summary");
      setReceivableBalanceCard(data.outstanding.they_owe_me);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getReceivableBalance();
  }, [debts]);
  return (
    <button
      type="button"
      className={"balance-card" + (active ? " total" : "")}
      aria-pressed={active}
      onClick={onClick}
    >
      <span className="balance-icon green">
        <CreditCard />
      </span>
      <div className="balance-text">
        <p className="balance-label">{t("receivable")}</p>
        <p className="balance-amount green">
          <strong>{receivableBalanceCard}</strong>
          <span>TJS</span>
        </p>
      </div>
    </button>
  );
}
