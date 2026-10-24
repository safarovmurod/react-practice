import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import DebtFilters from "../Debts/DebtFilters";
import ArchivedReceivableRow from "./ArchivedReceivableRow";
import ArchivedPayableRow from "./ArchivedPayableRow";
import ArchivedReceivableCard from "./ArchivedReceivableCard";
import ArchivedPayableCard from "./ArchivedPayableCard";
import { getPaidAmount, getRemaining, useDebtStore } from "../../store/debts";
import { useContactStore } from "../../store/contacts";
import type { Debt } from "../../store/debts";
export default function ArchiveContent() {
  const { t } = useTranslation();
  const { debts, payments, getDebts, getPayments } = useDebtStore();
  const { contacts, getContacts, getFolders } = useContactStore();
  const [search, setSearch] = useState("");
  const [contactId, setContactId] = useState("");
  const [folderId, setFolderId] = useState("");
  const [sort, setSort] = useState("date");
  const [descending, setDescending] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    async function load() {
      try {
        await getContacts();
        await getFolders();
        await getDebts();
        await getPayments();
      } catch {
        setError(true);
      }
    }
    load();
  }, [getContacts, getFolders, getDebts, getPayments]);
  function changeSort(value: string) {
    if (sort === value) setDescending(!descending);
    else {
      setSort(value);
      setDescending(true);
    }
  }
  const records = debts
    .filter((debt) => {
      const contact = contacts.find((item) => item.id === debt.contact_id);
      return (
        debt.status === "paid" &&
        (!contactId || debt.contact_id === contactId) &&
        (!folderId || (contact?.folder_id || "unfiled") === folderId) &&
        (contact?.name || "").toLowerCase().includes(search.toLowerCase())
      );
    })
    .sort((a, b) => {
      let difference =
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      if (sort === "amount") {
        difference = getRemaining(a, payments) - getRemaining(b, payments);
      }
      return descending ? -difference : difference;
    });
  function props(debt: Debt) {
    const paid = getPaidAmount(debt.id, payments);
    return {
      id: debt.id,
      name: contacts.find((item) => item.id === debt.contact_id)?.name || "—",
      total: String(debt.amount),
      amount: String(getRemaining(debt, payments)),
      paid: String(paid),
      progress: Number(debt.amount)
        ? Math.round((paid / Number(debt.amount)) * 100)
        : 0,
      description: debt.description || "—",
      currency: debt.currency,
    };
  }
  return (
    <div className="page">
      <h1 className="mobile-page-title">{t("archive")}</h1>
      <div className="page-title">
        <h1>{t("archive")}</h1>
      </div>
      <section className="surface table-box archive-table">
        <DebtFilters
          search={search}
          onSearch={setSearch}
          contactId={contactId}
          onContact={setContactId}
          folderId={folderId}
          onFolder={setFolderId}
          newestFirst={sort === "date" && descending}
          onDateSort={() => changeSort("date")}
          largestFirst={sort === "amount" && descending}
          onAmountSort={() => changeSort("amount")}
        />
        {error && <p role="alert">{t("loadFailed")}</p>}
        {!error && records.length === 0 && <p>{t("emptyRecords")}</p>}
        <div className="desktop-table">
          <table>
            <thead>
              <tr>
                <th>{t("fullName")}</th>
                <th>{t("amount")}</th>
                <th>{t("progress")}</th>
                <th>{t("description")}</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {records.map((debt) =>
                debt.direction === "they_owe_me" ? (
                  <ArchivedReceivableRow key={debt.id} {...props(debt)} />
                ) : (
                  <ArchivedPayableRow key={debt.id} {...props(debt)} />
                ),
              )}
            </tbody>
          </table>
        </div>
        <div className="mobile-records">
          {records.map((debt) =>
            debt.direction === "they_owe_me" ? (
              <ArchivedReceivableCard key={debt.id} {...props(debt)} />
            ) : (
              <ArchivedPayableCard key={debt.id} {...props(debt)} />
            ),
          )}
        </div>
      </section>
    </div>
  );
}
