import { Link } from "react-router";
import ContactActions from "./ContactActions";
type Props = {
  id: string;
  name: string;
  phone?: string;
  balance?: string;
  notes?: string;
};
export default function ContactRow({
  id,
  name,
  phone = "—",
  balance = "0",
  notes = "—",
}: Props) {
  return (
    <tr>
      <td>
        <Link
          to={`/debts?contactId=${id}&contactName=${encodeURIComponent(name)}`}
        >
          {name}
        </Link>
      </td>
      <td>{phone}</td>
      <td>
        {balance} <span className="currency">TJS</span>
      </td>
      <td>{notes}</td>
      <td className="row-actions">
        <ContactActions id={id} name={name} />
      </td>
    </tr>
  );
}
