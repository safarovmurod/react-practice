import ConfirmDeleteDialog from "../Shared/ConfirmDeleteDialog";
import { axiosRequest } from "../../token/token";
import { useContactStore } from "../../store/contacts";
import { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/EditOutlined";
import ActionIcon from "@mui/icons-material/DeleteOutlineRounded";
import FolderFormDialog from "./FolderFormDialog";
type Props = {
  id: string;
  name: string;
  onDelete?: () => void;
};
export default function FolderActions({ id, name, onDelete }: Props) {
  const { t } = useTranslation();
  const getFolders = useContactStore((state) => state.getFolders);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [openEdit, setOpenEdit] = useState(false);
  async function deleteFolder() {
    await axiosRequest.delete(`/api/folders/${id}`);
    await getFolders();
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
      <ConfirmDeleteDialog
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        onConfirm={deleteFolder}
      />
      <FolderFormDialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        name={name}
        folderId={id}
      />
    </>
  );
}
