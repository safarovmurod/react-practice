import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { Alert, Dialog } from "@mui/material";
import axios from "axios";
import FormInput from "../Shared/FormInput";
import { axiosRequest } from "../../token/token";
import { useContactStore } from "../../store/contacts";
type Props = {
  open: boolean;
  onClose: () => void;
  name?: string;
  contactId?: string;
};
export default function ContactFormDialog({
  open,
  onClose,
  name = "",
  contactId,
}: Props) {
  const { t } = useTranslation();
  const contacts = useContactStore((state) => state.contacts);
  const getContacts = useContactStore((state) => state.getContacts);
  const contact = contacts.find((item) => item.id === contactId);
  const [error, setError] = useState("");
  const formik = useFormik({
    initialValues: {
      name: contact?.name || name,
      phone: contact?.phone || "",
      note: contact?.note || "",
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      setError("");
      try {
        const data = {
          name: values.name.trim(),
          phone: values.phone,
          note: values.note,
        };
        if (contactId)
          await axiosRequest.patch(`/api/contacts/${contactId}`, data);
        else await axiosRequest.post("/api/contacts", data);
        await getContacts();
        closeForm();
      } catch (error) {
        let message = t("saveFailed");
        if (axios.isAxiosError(error)) {
          message = error.response?.data?.error || message;
        }
        setError(message);
      }
    },
  });
  function closeForm() {
    formik.resetForm();
    setError("");
    onClose();
  }
  return (
    <Dialog
      open={open}
      onClose={closeForm}
      maxWidth={false}
      slotProps={{ paper: { className: "form-dialog folder-form" } }}
      aria-labelledby="ContactFormDialog-title"
    >
      <div className="dialog-heading">
        <h2 id="ContactFormDialog-title">
          {contactId ? t("editContact") : t("addContact")}
        </h2>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-fields">
          <FormInput
            label={t("fullName")}
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            required
          />
          <FormInput
            label={t("optionalPhone")}
            name="phone"
            type="tel"
            value={formik.values.phone}
            onChange={formik.handleChange}
          />
          <div className="form-field">
            <label htmlFor="contact-notes" className="form-label">
              {t("optionalNotes")}
            </label>
            <textarea
              id="contact-notes"
              name="note"
              rows={3}
              value={formik.values.note}
              onChange={formik.handleChange}
            />
          </div>
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
            disabled={formik.isSubmitting}
            className="button"
          >
            {contactId ? t("save") : t("create")}
          </button>
        </div>
      </form>
    </Dialog>
  );
}
