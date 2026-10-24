import type { Debt } from "../../store/debts";
import axios from "axios";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { Alert, Dialog, MenuItem, Select } from "@mui/material";
import PaymentsIcon from "@mui/icons-material/PaymentsRounded";
import AddIcon from "@mui/icons-material/Add";
import FolderFormDialog from "../Folders/FolderFormDialog";
import FormInput from "../Shared/FormInput";
import PhotoInput from "../Shared/PhotoInput";
import { useDebtStore, getContactId } from "../../store/debts";
import { useEffect, useState } from "react";
import { axiosRequest } from "../../token/token";
type Props = {
  open: boolean;
  onClose: () => void;
  name?: string;
  direction?: string;
  debt?: Debt;
};
export default function DebtFormDialog({
  open,
  onClose,
  name = "",
  direction = "receivable",
  debt,
}: Props) {
  interface Contact {
    id: string;
    folder_id?: string | null;
    name: string;
  }
  const [error, setError] = useState("");
  const [openFolder, setOpenFolder] = useState(false);
  const [folders, setFolders] = useState<Contact[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const addDebt = useDebtStore((state) => state.addDebt);
  const { t } = useTranslation();
  let initialType = direction;
  if (debt) {
    initialType = "payable";
    if (debt.direction === "they_owe_me") initialType = "receivable";
  }
  const formik = useFormik({
    initialValues: {
      contact_id: debt?.contact_id || "",
      personName: name,
      amount: debt ? String(debt.amount) : "",
      type: initialType,
      dueDate: debt?.due_date?.slice(0, 10) || "",
      description: debt?.description || "",
      folder:
        contacts.find((contact) => contact.id === debt?.contact_id)
          ?.folder_id || "",
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      setError("");
      if (Number(values.amount) <= 0) {
        setError("Маблағ бояд аз 0 зиёд бошад.");
        return;
      }
      let debtDirection: "they_owe_me" | "i_owe_them";
      if (values.type === "receivable") {
        debtDirection = "they_owe_me";
      } else {
        debtDirection = "i_owe_them";
      }
      try {
        const contactId = await getContactId(values.personName, values.folder);
        const data = {
          contact_id: contactId,
          direction: debtDirection,
          amount: Number(values.amount),
          currency: "TJS",
          due_date: values.dueDate || undefined,
          description: values.description || undefined,
        };
        if (debt) {
          await axiosRequest.patch(`/api/debts/${debt.id}`, data);
          await useDebtStore.getState().getDebts();
          await useDebtStore.getState().getPayments();
        } else {
          await addDebt(data);
        }
        closeForm();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(
            error.response?.data?.error ||
              "Қарз сабт нашуд. Пайвастшавиро санҷ.",
          );
        } else if (error instanceof Error) {
          setError(error.message);
        }
      }
    },
  });
  async function getContscts() {
    try {
      const { data } = await axiosRequest.get("/api/contacts");
      setContacts(data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getContscts();
  }, []);
  useEffect(() => {
    if (!open) return;
    axiosRequest
      .get("/api/folders")
      .then(({ data }) => setFolders(data))
      .catch((error) => console.error(error));
  }, [open, openFolder]);
  function closeForm() {
    setError("");
    formik.resetForm();
    onClose();
  }
  return (
    <>
      <Dialog
        open={open}
        onClose={closeForm}
        maxWidth={false}
        slotProps={{ paper: { className: "form-dialog debt-form" } }}
        aria-labelledby="DebtFormDialog-title"
      >
        <div className="dialog-heading">
          <PaymentsIcon />
          <h2 id="DebtFormDialog-title">
            {debt ? t("editDebt") : t("addDebt")}
          </h2>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-fields">
            <FormInput
              label={t("personName")}
              name="personName"
              value={formik.values.personName}
              placeholder="Номро нависед..."
              list="debt-contacts"
              required
              onChange={(event) => {
                formik.handleChange(event);
                const contact = contacts.find(
                  (item) => item.name === event.target.value,
                );
                formik.setFieldValue("contact_id", contact ? contact.id : "");
              }}
            />
            <datalist id="debt-contacts">
              {contacts.map((contact) => (
                <option key={contact.id} value={contact.name} />
              ))}
            </datalist>
            <div className="debt-amount-type">
              <FormInput
                label={t("amount")}
                name="amount"
                type="number"
                value={formik.values.amount}
                onChange={formik.handleChange}
                placeholder="Маблағро ворид кунед"
                required
              />
              <div className="form-field">
                <label className="form-label">{t("type")} *</label>
                <div className="debt-type" role="group" aria-label={t("type")}>
                  <button
                    type="button"
                    aria-pressed={formik.values.type === "payable"}
                    className={
                      "button button-outline " +
                      (formik.values.type === "payable"
                        ? "selected-payable"
                        : "")
                    }
                    onClick={() => formik.setFieldValue("type", "payable")}
                  >
                    {t("payable")}
                  </button>
                  <button
                    type="button"
                    aria-pressed={formik.values.type === "receivable"}
                    className={
                      "button button-outline " +
                      (formik.values.type === "receivable"
                        ? "selected-receivable"
                        : "")
                    }
                    onClick={() => formik.setFieldValue("type", "receivable")}
                  >
                    {t("receivable")}
                  </button>
                </div>
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="debt-folder" className="form-label">
                {t("folder")}
              </label>
              <div className="debt-folder-row">
                <Select
                  id="debt-folder"
                  name="folder"
                  displayEmpty
                  size="small"
                  value={formik.values.folder}
                  onChange={formik.handleChange}
                  inputProps={{ "aria-label": t("folder") }}
                >
                  <MenuItem value="">Ҳеҷ</MenuItem>
                  {folders.map((folder) => (
                    <MenuItem key={folder.id} value={folder.id}>
                      {folder.name}
                    </MenuItem>
                  ))}
                </Select>
                <button
                  type="button"
                  className="debt-folder-add"
                  aria-label={t("addFolder")}
                  onClick={() => setOpenFolder(true)}
                >
                  <AddIcon />
                </button>
              </div>
            </div>
            <FormInput
              label={t("dueDate")}
              name="dueDate"
              type="date"
              value={formik.values.dueDate}
              onChange={formik.handleChange}
            />
            <div className="form-field">
              <label htmlFor="debt-description" className="form-label">
                {t("description")}
              </label>
              <textarea
                id="debt-description"
                name="description"
                rows={2}
                placeholder="Тавсифро ворид кунед..."
                value={formik.values.description}
                onChange={formik.handleChange}
              />
            </div>
            <PhotoInput />
          </div>
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
              className="button"
              disabled={formik.isSubmitting}
            >
              {debt ? t("save") : t("create")}
            </button>
          </div>
        </form>
      </Dialog>
      <FolderFormDialog
        open={openFolder}
        onClose={() => setOpenFolder(false)}
        onSaved={(folder) => {
          setFolders((current) => [...current, folder]);
          formik.setFieldValue("folder", folder.id);
        }}
      />
    </>
  );
}
