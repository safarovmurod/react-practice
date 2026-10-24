import ArchiveActions from "./ArchiveActions";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
type Props = {
  paid: string;
  progress: number;
  currency?: string;
  id: string;
  name: string;
  amount: string;
  total: string;
  description?: string;
};
export default function ArchivedPayableRow({
  id,
  name,
  amount,
  total,
  paid,
  progress,
  currency = "TJS",
  description = "—",
}: Props) {
  const { t } = useTranslation();
  return (
    <tr>
      <td>
        <Link to={`/debts/${id}`}>
          <strong>{name}</strong>
        </Link>
        <p className="archive-tags">
          <span>{t("closed")}</span>
          <small className="red">{t("payable")}</small>
        </p>
      </td>
      <td>
        <strong className="red">−{amount}</strong>{" "}
        <span className="currency">{currency}</span>
        <p className="muted">
          {t("total")}: {total}
        </p>
      </td>
      <td>
        <div className="progress">
          <span>
            {paid} / {total} · {progress}%
          </span>
          <progress value={progress} className="progress-bar" max={100} />
        </div>
      </td>
      <td>{description}</td>
      <td>
        <ArchiveActions id={id} name={name} />
      </td>
    </tr>
  );
}
