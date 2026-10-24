import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";
import DebtFilters from "./DebtFilters";
import ReceivableDebtRow from "./ReceivableDebtRow";
import PayableDebtRow from "./PayableDebtRow";
import ReceivableDebtCard from "./ReceivableDebtCard";
import PayableDebtCard from "./PayableDebtCard";
import { getRemaining, useDebtStore } from "../../store/debts";
import { useContactStore } from "../../store/contacts";
export default function DebtsTable({
  children,
  cards,
  direction = "",
}: {
  children?: ReactNode;
  cards?: ReactNode;
  direction?: string;
}) {
  const { t, i18n } = useTranslation();
  const { debts, payments, getDebts, getPayments } = useDebtStore();
  const { contacts, getContacts, getFolders } = useContactStore();
  const [params, setParams] = useSearchParams();
  const contactId = params.get("contactId") || "";
  const folderId = params.get("folderId") || "";
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("date");
  const [descending, setDescending] = useState(true);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function load() {
      try {
        await getContacts();
        await getFolders();
        await getDebts();
        await getPayments();
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [getContacts, getFolders, getDebts, getPayments]);
  function filterParam(key: string, value: string) {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next);
  }
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
      if (debt.status === "paid") return false;
      if (direction && debt.direction !== direction) return false;
      if (contactId && debt.contact_id !== contactId) return false;
      if (folderId && (contact?.folder_id || "unfiled") !== folderId)
        return false;
      return (contact?.name || "").toLowerCase().includes(search.toLowerCase());
    })
    .sort((a, b) => {
      let difference =
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      if (sort === "amount") {
        difference = getRemaining(a, payments) - getRemaining(b, payments);
      }
      return descending ? -difference : difference;
    });
  function date(value?: string | null) {
    return value ? new Date(value).toLocaleDateString(i18n.language) : "—";
  }
  return (
    <section className="surface table-box debt-table">
      <DebtFilters
        search={search}
        onSearch={setSearch}
        contactId={contactId}
        onContact={(value) => filterParam("contactId", value)}
        folderId={folderId}
        onFolder={(value) => filterParam("folderId", value)}
        newestFirst={sort === "date" && descending}
        onDateSort={() => changeSort("date")}
        largestFirst={sort === "amount" && descending}
        onAmountSort={() => changeSort("amount")}
      />
      {error && <p role="alert">{t("loadFailed")}</p>}
      {loading && <p>{t("paymentsLoading")}</p>}
      {!loading && !error && records.length === 0 && <p>{t("emptyRecords")}</p>}
      <div className="desktop-table">
        <table>
          <thead>
            <tr>
              <th>{t("fullName")}</th>
              <th>{t("amount")}</th>
              <th>{t("progress")}</th>
              <th>{t("dueDate")}</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {children ||
              records.map((debt) => {
                const name =
                  contacts.find((item) => item.id === debt.contact_id)?.name ||
                  "—";
                const remaining = getRemaining(debt, payments);
                const progress = Number(debt.amount)
                  ? Math.round((remaining / Number(debt.amount)) * 100)
                  : 0;
                const props = {
                  id: debt.id,
                  name,
                  amount: String(remaining),
                  currency: debt.currency,
                  progress,
                  date: `${date(debt.created_at)} — ${date(debt.due_date)}`,
                };
                return debt.direction === "they_owe_me" ? (
                  <ReceivableDebtRow key={debt.id} {...props} />
                ) : (
                  <PayableDebtRow key={debt.id} {...props} />
                );
              })}
          </tbody>
        </table>
      </div>
      <div className="mobile-records">
        {cards ||
          records.map((debt) => {
            const name =
              contacts.find((item) => item.id === debt.contact_id)?.name || "—";
            const props = {
              id: debt.id,
              name,
              amount: String(getRemaining(debt, payments)),
              currency: debt.currency,
              created: date(debt.created_at),
              due: date(debt.due_date),
            };
            return debt.direction === "they_owe_me" ? (
              <ReceivableDebtCard key={debt.id} {...props} />
            ) : (
              <PayableDebtCard key={debt.id} {...props} />
            );
          })}
      </div>
    </section>
  );
}
