import CircleDollarSign from "@mui/icons-material/CurrencyExchangeRounded";
import { useTranslation } from "react-i18next";
type Props = {
  name: string;
  amount: string;
  date: string;
  label?: string;
};
export default function OutgoingPayment({ name, amount, date, label }: Props) {
  const { t } = useTranslation();
  return (
    <div className="payment">
      <span className="payment-icon red">
        <CircleDollarSign />
      </span>
      <div className="payment-name">
        <p>{name}</p>
        <span>{date}</span>
      </div>
      <div className="payment-amount red">
        <strong>−{amount}</strong>
        <span className="payment-badge">{label || t("outgoing")}</span>
      </div>
    </div>
  );
}
