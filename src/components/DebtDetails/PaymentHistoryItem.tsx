import CalendarDays from "@mui/icons-material/CalendarMonthOutlined";
import Wallet from "@mui/icons-material/AccountBalanceWalletRounded";
import { useTranslation } from "react-i18next";
type Props = {
  amount: string;
  date: string;
  currency?: string;
  payment?: boolean;
  note?: string | null;
};
export default function PaymentHistoryItem({
  amount,
  date,
  currency = "TJS",
  payment = false,
  note,
}: Props) {
  const { t } = useTranslation();
  return (
    <div className="history-payment">
      <span className="history-icon">
        <Wallet />
      </span>
      <strong>
        {amount} <small>{currency}</small>
      </strong>
      <div>
        <span className="history-badge">
          {payment ? t("paymentRecord") : t("debtCreated")}
        </span>
        <p>
          <CalendarDays />
          {date}
        </p>
        {note && <p>{note}</p>}
      </div>
    </div>
  );
}
