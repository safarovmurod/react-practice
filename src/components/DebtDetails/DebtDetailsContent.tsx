import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import ArrowLeft from "@mui/icons-material/ArrowBackRounded";
import CalendarDays from "@mui/icons-material/CalendarMonthOutlined";
import Folder from "@mui/icons-material/FolderOutlined";
import Pencil from "@mui/icons-material/EditOutlined";
import Plus from "@mui/icons-material/Add";
import { useTranslation } from "react-i18next";
import DebtFormDialog from "../Dashboard/DebtFormDialog";
import DebtOverview from "./DebtOverview";
import PaymentFormDialog from "../Debts/PaymentFormDialog";
import PaymentHistoryItem from "./PaymentHistoryItem";
import { useDebtStore, getPaidAmount, getRemaining } from "../../store/debts";
import type { Debt } from "../../store/debts";
import { useContactStore } from "../../store/contacts";
import { axiosRequest } from "../../token/token";
export default function DebtDetailsContent() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const [openDebtForm, setOpenDebtForm] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);
  const [record, setRecord] = useState<Debt | null>(null);
  const [error, setError] = useState(false);
  const { debts, payments, getDebts, getPayments } = useDebtStore();
  const { contacts, folders, getContacts, getFolders } = useContactStore();
  const debt = debts.find((item) => item.id === id) || record;
  useEffect(() => {
    setRecord(null);
    setError(false);
    async function load() {
      try {
        const { data } = await axiosRequest.get(`/api/debts/${id}`);
        setRecord(data);
        await getContacts();
        await getFolders();
        await getDebts();
        await getPayments();
      } catch {
        setError(true);
      }
    }
    load();
  }, [id, getContacts, getFolders, getDebts, getPayments]);
  async function changeStatus() {
    try {
      let status = "paid";
      if (debt?.status === "paid") status = "pending";
      await axiosRequest.patch(`/api/debts/${id}`, { status });
      await getDebts();
    } catch {
      setError(true);
    }
  }
  function date(value?: string | null) {
    if (!value) return "—";
    return new Date(value).toLocaleDateString(i18n.language);
  }
  if (error) return <p role="alert">{t("loadFailed")}</p>;
  if (!debt) return <p>{t("paymentsLoading")}</p>;
  const contact = contacts.find((item) => item.id === debt.contact_id);
  const name = contact?.name || "—";
  const folder = folders.find((item) => item.id === contact?.folder_id);
  const history = payments
    .filter((payment) => payment.debt_id === debt.id)
    .sort(
      (a, b) => new Date(b.paid_at).getTime() - new Date(a.paid_at).getTime(),
    );
  return (
    <div className="page debt-details">
      <h1 className="mobile-page-title">{t("debtDetails")}</h1>
      <div className="page-title">
        <div className="detail-heading">
          <Link
            className="button button-outline"
            to="/debts"
            aria-label={t("backDebts")}
          >
            <ArrowLeft />
          </Link>
          <div>
            <h1>{t("debtDetails")}</h1>
            <p>{name}</p>
          </div>
        </div>
        <div className="page-buttons">
          <button
            onClick={() => setOpenDebtForm(true)}
            className="button button-outline"
          >
            <Pencil />
            {t("edit")}
          </button>
          <button onClick={changeStatus} className="button close-debt-button">
            {debt.status === "paid" ? t("reopen") : t("markClosed")}
          </button>
        </div>
      </div>
      <DebtFormDialog
        debt={debt}
        name={name}
        open={openDebtForm}
        onClose={() => setOpenDebtForm(false)}
      />
      <div className="debt-details-grid">
        <div className="details-left">
          <DebtOverview
            name={name}
            amount={String(getRemaining(debt, payments))}
            total={String(debt.amount)}
            paid={String(getPaidAmount(debt.id, payments))}
            currency={debt.currency}
            direction={debt.direction}
            status={debt.status}
          />
          <section className="surface detail-information">
            <h2>{t("details")}</h2>
            <p>
              <CalendarDays />
              <span>{t("createdDate")}</span>
              <strong>{date(debt.created_at)}</strong>
            </p>
            <p>
              <CalendarDays />
              <span>{t("dueDate")}</span>
              <strong>{date(debt.due_date)}</strong>
            </p>
            <p>
              <Folder />
              <span>{t("folder")}</span>
              <strong>{folder?.name || t("unfiled")}</strong>
            </p>
          </section>
        </div>
        <section className="surface payment-history">
          <div className="box-header">
            <h2>
              {t("payments")} ({history.length})
            </h2>
            <button
              onClick={() => setOpenPayment(true)}
              aria-label={t("addPayment")}
              className="button button-ghost button-icon"
            >
              <Plus />
            </button>
          </div>
          <PaymentFormDialog
            debtId={debt.id}
            open={openPayment}
            onClose={() => setOpenPayment(false)}
          />
          <div className="history-content">
            <PaymentHistoryItem
              amount={String(debt.amount)}
              date={date(debt.created_at)}
              currency={debt.currency}
            />
            {history.map((payment) => (
              <PaymentHistoryItem
                key={payment.id}
                payment
                amount={String(payment.amount)}
                date={date(payment.paid_at)}
                currency={debt.currency}
                note={payment.note}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
