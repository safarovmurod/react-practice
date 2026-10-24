import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { Alert, Dialog } from "@mui/material";
import axios from "axios";
import FormInput from "../Shared/FormInput";
import { useDebtStore } from "../../store/debts";
import { axiosRequest } from "../../token/token";
type Props = {
  open: boolean;
  onClose: () => void;
  name?: string;
  quick?: boolean;
  direction?: string;
  debtId?: string;
};
interface Contact {
  id: string;
  name: string;
}
export default function PaymentFormDialog({
  open,
  onClose,
  quick = false,
  direction = "",
  debtId = "",
}: Props) {
  const { t } = useTranslation();
  const debts = useDebtStore((state) => state.debts);
  const getDebts = useDebtStore((state) => state.getDebts);
  const addPayment = useDebtStore((state) => state.addPayment);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!open) return;
    getDebts();
    axiosRequest
      .get("/api/contacts")
      .then(({ data }) => setContacts(data))
      .catch(() => setError(t("paymentsLoadError")));
  }, [open, getDebts, t]);
  const formik = useFormik({
    initialValues: { debtId, amount: "", note: "" },
    enableReinitialize: true,
    onSubmit: async (values) => {
      setError("");
      if (Number(values.amount) <= 0) {
        setError(t("paymentAmountPositive"));
        return;
      }
      try {
        await addPayment(values.debtId, Number(values.amount), values.note);
        closeForm();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data?.error || t("paymentSaveError"));
        } else {
          setError(t("paymentSaveError"));
        }
      }
    },
  });
  function closeForm() {
    formik.resetForm();
    setError("");
    onClose();
  }
  const availableDebts = debts.filter(
    (debt) => !direction || debt.direction === direction,
  );
  return (
    <Dialog
      open={open}
      onClose={closeForm}
      maxWidth={false}
      slotProps={{ paper: { className: "form-dialog payment-form" } }}
      aria-labelledby="PaymentFormDialog-title"
    >
      <div className="dialog-heading">
        <h2 id="PaymentFormDialog-title">
          {quick ? t("quickPayment") : t("addPayment")}
        </h2>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-field">
          <label htmlFor="payment-debt" className="form-label">
            {t("selectDebt")}
          </label>
          <select
            id="payment-debt"
            name="debtId"
            className="form-select"
            value={formik.values.debtId}
            onChange={formik.handleChange}
            required
          >
            <option value="">{t("selectDebt")}</option>
            {availableDebts.map((debt) => {
              const contact = contacts.find(
                (item) => item.id === debt.contact_id,
              );
              return (
                <option key={debt.id} value={debt.id}>
                  {contact ? contact.name : "—"} — {debt.amount} {debt.currency}{" "}
                  · {new Date(debt.created_at).toLocaleDateString()}
                </option>
              );
            })}
          </select>
        </div>
        <FormInput
          label={t("amount")}
          name="amount"
          type="number"
          value={formik.values.amount}
          onChange={formik.handleChange}
          required
        />
        <FormInput
          label={t("description")}
          name="note"
          value={formik.values.note}
          onChange={formik.handleChange}
        />
        {error && <Alert severity="error">{error}</Alert>}
        <div className="dialog-actions">
          <button
            type="button"
            onClick={closeForm}
            className="button button-ghost"
          >
            {t("cancel")}
          </button>
          <button
            type="submit"
            disabled={
              formik.isSubmitting ||
              !availableDebts.some((debt) => debt.id === formik.values.debtId)
            }
            className="button"
          >
            {t("addPayment")}
          </button>
        </div>
      </form>
    </Dialog>
  );
}
