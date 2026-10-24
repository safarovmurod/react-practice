import { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import DownloadIcon from "@mui/icons-material/FileDownloadOutlined";
type Props = {
  onExcel?: () => void;
  onPdf?: () => void;
};
export default function ExportMenu({ onExcel, onPdf }: Props) {
  const { t } = useTranslation();
  const [error, setError] = useState("");
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  async function exportExcel() {
    setAnchorEl(null);
    try {
      setError("");
      if (onExcel) {
        onExcel();
      } else {
        const { downloadDebtExcel } = await import("./exportDebts");
        await downloadDebtExcel();
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : t("saveFailed"));
    }
  }
  async function exportPdf() {
    setAnchorEl(null);
    try {
      setError("");
      if (onPdf) {
        onPdf();
      } else {
        const { downloadDebtPdf } = await import("./exportDebts");
        await downloadDebtPdf();
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : t("saveFailed"));
    }
  }
  return (
    <>
      <button
        type="button"
        className="button button-outline"
        aria-label={t("export")}
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        <DownloadIcon />
        <span className="button-label">{t("export")}</span>
      </button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={exportExcel}>Excel</MenuItem>
        <MenuItem onClick={exportPdf}>PDF</MenuItem>
      </Menu>
      {error && <span role="alert">{error}</span>}
    </>
  );
}
