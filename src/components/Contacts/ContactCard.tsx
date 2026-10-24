import { Link } from "react-router";
import ContactActions from "./ContactActions";
type Props = {
  id: string;
  name: string;
  phone?: string;
  balance?: string;
};
export default function ContactCard({
  id,
  name,
  phone = "—",
  balance = "0",
}: Props) {
  return (
    <article className="contact-mobile-card">
      <div>
        <Link
          to={`/debts?contactId=${id}&contactName=${encodeURIComponent(name)}`}
        >
          <strong>{name}</strong>
        </Link>
        <p>{phone}</p>
        <p>
          {balance} <span className="currency">TJS</span>
        </p>
      </div>
      <ContactActions id={id} name={name} />
    </article>
  );
}
