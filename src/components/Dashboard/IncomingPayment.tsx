import CircleDollarSign from "@mui/icons-material/CurrencyExchangeRounded";
import { useTranslation } from "react-i18next";
type Props = {
  name: string;
  amount: string;
  date: string;
  label?: string;
};
export default function IncomingPayment({ name, amount, date, label }: Props) {
  const { t } = useTranslation();
  return (
    <div className="payment">
      <span className="payment-icon green">
        <CircleDollarSign />
      </span>
      <div className="payment-name">
        <p>{name}</p>
        <span>{date}</span>
      </div>
      <div className="payment-amount green">
        <strong>+{amount}</strong>
        <span className="payment-badge">{label || t("incoming")}</span>
      </div>
    </div>
  );
}
