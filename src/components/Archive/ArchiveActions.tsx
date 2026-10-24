import { useDebtStore } from "../../store/debts";
import { axiosRequest } from "../../token/token";
import { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/EditOutlined";
import ActionIcon from "@mui/icons-material/RestoreRounded";
import DebtFormDialog from "../Dashboard/DebtFormDialog";
type Props = {
  id: string;
  name: string;
  onReopen?: () => void;
};
export default function ArchiveActions({ id, name, onReopen }: Props) {
  const { t } = useTranslation();
  const debt = useDebtStore((state) =>
    state.debts.find((item) => item.id === id),
  );
  const [error, setError] = useState(false);
  async function reopen() {
    try {
      await axiosRequest.patch(`/api/debts/${id}`, { status: "pending" });
      await useDebtStore.getState().getDebts();
      onReopen?.();
    } catch {
      setError(true);
    }
  }
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [openEdit, setOpenEdit] = useState(false);
  return (
    <>
      <button
        type="button"
        className="button button-ghost button-icon"
        aria-label={t("actions")}
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        <MoreVertIcon />
      </button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            setOpenEdit(true);
          }}
        >
          <EditIcon />
          {t("edit")}
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            reopen();
          }}
        >
          <ActionIcon />
          {t("reopen")}
        </MenuItem>
      </Menu>
      {error && <span role="alert">{t("saveFailed")}</span>}
      <DebtFormDialog
        debt={debt}
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        name={name}
      />
    </>
  );
}
