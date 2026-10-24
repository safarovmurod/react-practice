import { useTranslation } from "react-i18next";
import Search from "@mui/icons-material/SearchRounded";
import ArrowDownUp from "@mui/icons-material/SwapVertRounded";
import ListFilter from "@mui/icons-material/SortRounded";
import { useContactStore } from "../../store/contacts";
type Props = {
  search?: string;
  onSearch?: (value: string) => void;
  contactId?: string;
  onContact?: (value: string) => void;
  folderId?: string;
  onFolder?: (value: string) => void;
  newestFirst?: boolean;
  onDateSort?: () => void;
  largestFirst?: boolean;
  onAmountSort?: () => void;
};
export default function DebtFilters({
  search = "",
  onSearch,
  contactId = "",
  onContact,
  folderId = "",
  onFolder,
  newestFirst,
  onDateSort,
  largestFirst,
  onAmountSort,
}: Props) {
  const { t } = useTranslation();
  const contacts = useContactStore((state) => state.contacts);
  const folders = useContactStore((state) => state.folders);
  return (
    <div className="table-toolbar">
      <div className="search">
        <Search />
        <input
          aria-label={t("searchByName")}
          placeholder={t("searchByName")}
          className="search-field"
          value={search}
          onChange={(event) => onSearch?.(event.target.value)}
        />
      </div>
      <div className="filters">
        <select
          className="filter-select"
          aria-label={t("contacts")}
          value={contactId}
          onChange={(event) => onContact?.(event.target.value)}
        >
          <option value="">{t("allContacts")}</option>
          {contacts.map((contact) => (
            <option key={contact.id} value={contact.id}>
              {contact.name}
            </option>
          ))}
        </select>
        <select
          className="filter-select"
          aria-label={t("folders")}
          value={folderId}
          onChange={(event) => onFolder?.(event.target.value)}
        >
          <option value="">{t("allFolders")}</option>
          <option value="unfiled">{t("unfiled")}</option>
          {folders.map((folder) => (
            <option key={folder.id} value={folder.id}>
              {folder.name}
            </option>
          ))}
        </select>
        <button
          type="button"
          aria-label={t("sortDate")}
          aria-pressed={newestFirst}
          onClick={onDateSort}
          className="button button-outline button-icon"
        >
          <ListFilter />
        </button>
        <button
          type="button"
          aria-label={t("sortAmount")}
          aria-pressed={largestFirst}
          onClick={onAmountSort}
          className="button button-outline button-icon"
        >
          <ArrowDownUp />
        </button>
      </div>
    </div>
  );
}
