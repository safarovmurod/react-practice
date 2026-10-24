import { useEffect, useState } from "react";
import Plus from "@mui/icons-material/Add";
import { useTranslation } from "react-i18next";
import FolderFormDialog from "./FolderFormDialog";
import FolderCard from "./FolderCard";
import { useContactStore } from "../../store/contacts";
import { getRemaining, useDebtStore } from "../../store/debts";
export default function FoldersContent() {
  const { t } = useTranslation();
  const [openFolderForm, setOpenFolderForm] = useState(false);
  const [error, setError] = useState(false);
  const { contacts, folders, getContacts, getFolders } = useContactStore();
  const { debts, payments, getDebts, getPayments } = useDebtStore();
  useEffect(() => {
    async function load() {
      try {
        await getFolders();
        await getContacts();
        await getDebts();
        await getPayments();
      } catch {
        setError(true);
      }
    }
    load();
  }, [getFolders, getContacts, getDebts, getPayments]);
  function totals(folderId: string) {
    let receivable = 0;
    let payable = 0;
    for (const debt of debts) {
      if (debt.status === "paid") continue;
      const contact = contacts.find((item) => item.id === debt.contact_id);
      const contactFolder = contact?.folder_id || "unfiled";
      if (contactFolder !== folderId) continue;
      if (debt.direction === "they_owe_me")
        receivable += getRemaining(debt, payments);
      else payable += getRemaining(debt, payments);
    }
    return {
      total: String(receivable - payable),
      receivable: String(receivable),
      payable: String(payable),
    };
  }
  return (
    <div className="page">
      <h1 className="mobile-page-title">{t("folders")}</h1>
      <div className="page-title">
        <h1>{t("folders")}</h1>
        <button
          onClick={() => setOpenFolderForm(true)}
          type="button"
          className="button"
        >
          <Plus />
          <span>{t("addFolder")}</span>
        </button>
      </div>
      {error && <p role="alert">{t("loadFailed")}</p>}
      <FolderFormDialog
        open={openFolderForm}
        onClose={() => setOpenFolderForm(false)}
      />
      <div className="folders">
        <FolderCard id="unfiled" name={t("unfiled")} {...totals("unfiled")} />
        {folders.map((folder) => (
          <FolderCard
            key={folder.id}
            id={folder.id}
            name={folder.name}
            {...totals(folder.id)}
          />
        ))}
      </div>
    </div>
  );
}
