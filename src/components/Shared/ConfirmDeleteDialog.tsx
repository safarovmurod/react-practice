import { useState } from "react";
import { Alert, Dialog } from "@mui/material";
import { useTranslation } from "react-i18next";
import axios from "axios";
type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
};
export default function ConfirmDeleteDialog({
  open,
  onClose,
  onConfirm,
}: Props) {
  const { t } = useTranslation();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function confirm() {
    setBusy(true);
    setError("");
    try {
      await onConfirm();
      onClose();
    } catch (error) {
      let message = t("saveFailed");
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.error || message;
      }
      setError(message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <Dialog
      open={open}
      onClose={() => {
        if (!busy) {
          setError("");
          onClose();
        }
      }}
      maxWidth={false}
      slotProps={{ paper: { className: "form-dialog folder-form" } }}
      aria-labelledby="delete-title"
    >
      <h2 id="delete-title">{t("deleteConfirm")}</h2>
      <p>{t("deleteWarning")}</p>
      {error && <Alert severity="error">{error}</Alert>}
      <div className="dialog-actions">
        <button
          className="button button-ghost"
          onClick={onClose}
          disabled={busy}
        >
          {t("cancel")}
        </button>
        <button className="button" onClick={confirm} disabled={busy}>
          {t("delete")}
        </button>
      </div>
    </Dialog>
  );
}
