import { Link } from "react-router";
import CalendarDays from "@mui/icons-material/CalendarMonthOutlined";
import CircleDollarSign from "@mui/icons-material/CurrencyExchangeRounded";
import DebtActions from "./DebtActions";
type Props = {
  id: string;
  name: string;
  amount: string;
  currency?: string;
  progress?: number;
  date?: string;
};
export default function PayableDebtRow({
  id,
  name,
  amount,
  currency = "TJS",
  progress = 100,
  date = "22.10.2026 — 11.11.2026",
}: Props) {
  return (
    <tr>
      <td>
        <Link to={`/debts/${id}`} className="person">
          <span className="person-icon red">
            <CircleDollarSign />
          </span>
          {name}
        </Link>
      </td>
      <td>
        <strong className="red">−{amount}</strong>{" "}
        <span className="currency">{currency}</span>
      </td>
      <td>
        <div className="progress">
          <span>{progress}%</span>
          <progress value={progress} className="progress-bar" max={100} />
        </div>
      </td>
      <td>
        <span className="date">
          <CalendarDays />
          {date}
        </span>
      </td>
      <td className="row-actions">
        <DebtActions id={id} name={name} />
      </td>
    </tr>
  );
}
