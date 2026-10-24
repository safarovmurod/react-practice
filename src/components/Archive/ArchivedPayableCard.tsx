import ArchiveActions from "./ArchiveActions";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
type Props = {
  paid: string;
  progress: number;
  currency?: string;
  id: string;
  name: string;
  total: string;
  amount: string;
};
export default function ArchivedPayableCard({
  id,
  name,
  total,
  amount,
  paid,
  progress,
  currency = "TJS",
}: Props) {
  const { t } = useTranslation();
  return (
    <article className="archive-mobile-card outgoing-card">
      <div className="archive-card-heading">
        <Link to={`/debts/${id}`}>
          <strong>{name}</strong>
        </Link>
        <span className="closed-badge">{t("closed")}</span>
        <strong className="red">
          −{amount}
          <small>{currency}</small>
        </strong>
        <ArchiveActions id={id} name={name} />
      </div>
      <div className="archive-card-progress">
        <progress
          value={progress}
          className="progress-bar red-progress"
          max={100}
        />
        <small>
          {paid}/{total}
        </small>
        <small>
          {t("total")}: {total}
        </small>
      </div>
    </article>
  );
}
