import CircleDollarSign from "@mui/icons-material/CurrencyExchangeRounded";
import { useTranslation } from "react-i18next";
type Props = {
  name: string;
  amount: string;
  paid?: string;
  total?: string;
  currency?: string;
  direction?: string;
  status?: string;
};
export default function DebtOverview({
  name,
  amount,
  paid = "0",
  total = amount,
  currency = "TJS",
  direction = "they_owe_me",
  status,
}: Props) {
  const { t } = useTranslation();
  const incoming = direction === "they_owe_me";
  const progress = Number(total)
    ? Math.round((Number(amount) / Number(total)) * 100)
    : 0;
  return (
    <section className="surface debt-overview">
      <div className="debt-overview-name">
        <span className={"person-icon " + (incoming ? "green" : "red")}>
          <CircleDollarSign />
        </span>
        <div>
          <strong>{name}</strong>
          <p>{incoming ? t("receivable") : t("payable")}</p>
        </div>
        <span className="active-badge">
          {status === "paid" ? t("closed") : t("active")}
        </span>
      </div>
      <p className={"detail-amount " + (incoming ? "green" : "red")}>
        {incoming ? "+" : "−"} {amount} <small>{currency}</small>
      </p>
      <div className="detail-progress">
        <span>
          {amount} / {total}
        </span>
        <strong>{progress}%</strong>
      </div>
      <progress value={progress} className="progress-bar" max={100} />
      <div className="detail-totals">
        <div>
          <span>{t("paid")}</span>
          <strong className="green">{paid}</strong>
        </div>
        <div>
          <span>{t("total")}</span>
          <strong className="orange">{total}</strong>
        </div>
      </div>
    </section>
  );
}
