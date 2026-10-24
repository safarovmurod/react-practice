import { Link } from "react-router";
import ArrowRight from "@mui/icons-material/ArrowForwardRounded";
import Folder from "@mui/icons-material/FolderOutlined";
import { useTranslation } from "react-i18next";
import FolderActions from "./FolderActions";
type Props = {
  id: string;
  name: string;
  total?: string;
  receivable?: string;
  payable?: string;
};
export default function FolderCard({
  id,
  name,
  total = "0",
  receivable = "0",
  payable = "0",
}: Props) {
  const { t } = useTranslation();
  const href = `/debts?folderId=${id}&folderName=${encodeURIComponent(name)}`;
  return (
    <section className="folder-card surface">
      <div className="folder-heading">
        <Link to={href} className="folder-name">
          <span className="folder-icon">
            <Folder />
          </span>
          <strong>{name}</strong>
        </Link>
        {id !== "unfiled" && <FolderActions id={id} name={name} />}
      </div>
      <div className="folder-content">
        <p>
          <span>{t("balance")}</span>
          <strong className={Number(total) < 0 ? "red" : "green"}>
            {Number(total) > 0 ? "+" : ""}
            {total} <small>TJS</small>
          </strong>
        </p>
        <p>
          <span>{t("receivable")}</span>
          <strong className="green">
            +{receivable} <small>TJS</small>
          </strong>
        </p>
        <p>
          <span>{t("payable")}</span>
          <strong className="red">
            −{payable} <small>TJS</small>
          </strong>
        </p>
      </div>
      <Link to={href} className="folder-arrow" aria-label={t("viewDebts")}>
        <ArrowRight />
      </Link>
    </section>
  );
}
