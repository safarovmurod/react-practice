import { getRemaining, useDebtStore } from "../../store/debts";
import { useContactStore } from "../../store/contacts";
import { useState, useEffect } from "react";
import Plus from "@mui/icons-material/Add";
import { useTranslation } from "react-i18next";
import ContactFormDialog from "./ContactFormDialog";
import ContactRow from "./ContactRow";
import ContactCard from "./ContactCard";
export default function ContactsContent() {
  const [openContactForm, setOpenContactForm] = useState(false);
  const { t } = useTranslation();
  const contacts = useContactStore((state) => state.contacts);
  const getContacts = useContactStore((state) => state.getContacts);
  const { debts, payments, getDebts, getPayments } = useDebtStore();
  const [search, setSearch] = useState("");
  const [error, setError] = useState(false);
  useEffect(() => {
    async function load() {
      try {
        await getContacts();
        await getDebts();
        await getPayments();
      } catch {
        setError(true);
      }
    }
    load();
  }, [getContacts, getDebts, getPayments]);
  function balance(id: string) {
    let total = 0;
    for (const debt of debts) {
      if (debt.contact_id !== id || debt.status === "paid") continue;
      const amount = getRemaining(debt, payments);
      if (debt.direction === "they_owe_me") total += amount;
      else total -= amount;
    }
    return total > 0 ? `+${total}` : String(total);
  }
  const filtered = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <div className="page">
      <h1 className="mobile-page-title">{t("contacts")}</h1>
      <div className="page-title">
        <h1>{t("contacts")}</h1>
        <>
          <button
            onClick={() => setOpenContactForm(true)}
            type="button"
            aria-label={t("addContact")}
            className="button"
          >
            <Plus data-icon="inline-start" />
            <span className="button-label">{t("addContact")}</span>
          </button>

          <ContactFormDialog
            open={openContactForm}
            onClose={() => setOpenContactForm(false)}
          />
        </>
      </div>
      {error && <p role="alert">{t("loadFailed")}</p>}
      <section className="surface table-box contact-table">
        <div className="table-toolbar">
          <input
            aria-label={t("searchContacts")}
            placeholder={t("searchContacts")}
            className="search-field"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <div className="desktop-table">
          <table>
            <thead>
              <tr>
                <th>{t("fullName")}</th>
                <th>{t("phone")}</th>
                <th>{t("balance")}</th>
                <th>{t("notes")}</th>
                <th className="row-actions">{t("actions")}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((contact) => (
                <ContactRow
                  key={contact.id}
                  id={contact.id}
                  name={contact.name}
                  balance={balance(contact.id)}
                  phone={contact.phone || "—"}
                  notes={contact.note || "—"}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className="mobile-records">
          {filtered.map((contact) => (
            <ContactCard
              key={contact.id}
              id={contact.id}
              name={contact.name}
              balance={balance(contact.id)}
              phone={contact.phone || "—"}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
