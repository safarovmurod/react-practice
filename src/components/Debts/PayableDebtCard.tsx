import { Link } from "react-router";
import CalendarDays from "@mui/icons-material/CalendarMonthOutlined";
import CircleDollarSign from "@mui/icons-material/CurrencyExchangeRounded";
import DebtActions from "./DebtActions";
type Props = {
  id: string;
  name: string;
  amount: string;
  currency?: string;
  created?: string;
  due?: string;
};
export default function PayableDebtCard({
  id,
  name,
  amount,
  currency = "TJS",
  created = "22.10.2026",
  due = "11.11.2026",
}: Props) {
  return (
    <article className="debt-mobile-card">
      <span className="person-icon red">
        <CircleDollarSign />
      </span>
      <div className="debt-card-person">
        <Link to={`/debts/${id}`}>
          <strong>{name}</strong>
        </Link>
        <p>{created}</p>
        <p>
          <CalendarDays />
          {due}
        </p>
      </div>
      <p className="red">
        <strong>−{amount}</strong> <span className="currency">{currency}</span>
      </p>
      <DebtActions id={id} name={name} />
    </article>
  );
}
