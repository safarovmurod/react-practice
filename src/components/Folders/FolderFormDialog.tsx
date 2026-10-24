import { useContactStore } from "../../store/contacts";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { Alert, Dialog } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { axiosRequest } from "../../token/token";
import FormInput from "../Shared/FormInput";
type Props = {
  open: boolean;
  onClose: () => void;
  name?: string;
  folderId?: string;
  onSaved?: (folder: { id: string; name: string }) => void;
};
export default function FolderFormDialog({
  open,
  onClose,
  name = "",
  folderId,
  onSaved,
}: Props) {
  const { t } = useTranslation();
  const getFolders = useContactStore((state) => state.getFolders);
  const [error, setError] = useState("");
  const formik = useFormik({
    initialValues: { name },
    enableReinitialize: true,
    onSubmit: async (values) => {
      setError("");
      try {
        let response;
        if (folderId) {
          response = await axiosRequest.patch(`/api/folders/${folderId}`, {
            name: values.name.trim(),
          });
        } else {
          response = await axiosRequest.post("/api/folders", {
            name: values.name.trim(),
          });
        }
        await getFolders();
        onSaved?.(response.data);
        closeForm();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(
            error.response?.data?.error ||
              "Ҷузвдон сабт нашуд. Пайвастшавиро санҷ.",
          );
        } else {
          setError("Ҷузвдон сабт нашуд.");
        }
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
      aria-labelledby="FolderFormDialog-title"
    >
      <div className="dialog-heading">
        <h2 id="FolderFormDialog-title">
          {folderId ? t("editFolder") : t("addFolder")}
        </h2>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <FormInput
          label={t("folderName")}
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          required
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
            className="button"
            disabled={formik.isSubmitting || !formik.values.name.trim()}
          >
            {folderId ? t("save") : t("create")}
          </button>
        </div>
      </form>
    </Dialog>
  );
}
