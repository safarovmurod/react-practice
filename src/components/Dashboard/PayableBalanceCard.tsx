import { useDebtStore } from "../../store/debts";
import BanknoteArrowUp from "@mui/icons-material/PaymentsRounded";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { axiosRequest } from "../../token/token";
export default function PayableBalanceCard({
  active = false,
  onClick,
}: {
  active?: boolean;
  onClick?: () => void;
}) {
  const { t } = useTranslation();
  const debts = useDebtStore((state) => state.debts);
  const [payableBalance, setPayableBalance] = useState(0);
  async function PayableBalance() {
    try {
      const { data } = await axiosRequest.get("/api/dashboard/summary");
      setPayableBalance(data.outstanding.i_owe_them);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    PayableBalance();
  }, [debts]);
  return (
    <button
      type="button"
      className={"balance-card" + (active ? " total" : "")}
      aria-pressed={active}
      onClick={onClick}
    >
      <span className="balance-icon red">
        <BanknoteArrowUp />
      </span>
      <div className="balance-text">
        <p className="balance-label">{t("payable")}</p>
        <p className="balance-amount red">
          <strong>{payableBalance}</strong>
          <span>TJS</span>
        </p>
      </div>
    </button>
  );
}
