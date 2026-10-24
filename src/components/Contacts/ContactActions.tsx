import ConfirmDeleteDialog from "../Shared/ConfirmDeleteDialog";
import { axiosRequest } from "../../token/token";
import { useContactStore } from "../../store/contacts";
import { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/EditOutlined";
import ActionIcon from "@mui/icons-material/DeleteOutlineRounded";
import ContactFormDialog from "./ContactFormDialog";
import AddIcon from "@mui/icons-material/Add";
import DebtFormDialog from "../Dashboard/DebtFormDialog";
type Props = {
  id: string;
  name: string;
  onDelete?: () => void;
};
export default function ContactActions({ id, name, onDelete }: Props) {
  const { t } = useTranslation();
  const getContacts = useContactStore((state) => state.getContacts);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDebt, setOpenDebt] = useState(false);
  async function deleteContact() {
    await axiosRequest.delete(`/api/contacts/${id}`);
    await getContacts();
    onDelete?.();
  }
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
            setOpenDebt(true);
          }}
        >
          <AddIcon />
          {t("addDebt")}
        </MenuItem>
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
            setConfirmDelete(true);
          }}
        >
          <ActionIcon />
          {t("delete")}
        </MenuItem>
      </Menu>
      <ContactFormDialog
        contactId={id}
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        name={name}
      />
      <ConfirmDeleteDialog
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        onConfirm={deleteContact}
      />
      <DebtFormDialog
        open={openDebt}
        onClose={() => setOpenDebt(false)}
        name={name}
      />
    </>
  );
}
