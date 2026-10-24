import { axiosRequest } from "../token/token";
import { getRecentPayments } from "./debts";
import type { Debt, RecentPayment } from "./debts";
import type { Contact } from "./contacts";
export async function getRecentActivities(debts: Debt[]) {
  const activities: RecentPayment[] = await getRecentPayments(debts);
  if (!debts.length) return activities;
  const { data: contacts } = await axiosRequest.get<Contact[]>("/api/contacts");
  for (const debt of debts) {
    activities.push({
      id: "debt-" + debt.id,
      kind: "debt",
      contactName:
        contacts.find((contact) => contact.id === debt.contact_id)?.name || "—",
      amount: Number(debt.amount),
      currency: debt.currency || "",
      direction: debt.direction,
      paid_at: debt.created_at,
    });
  }
  activities.sort(
    (a, b) => new Date(b.paid_at).getTime() - new Date(a.paid_at).getTime(),
  );
  return activities.slice(0, 5);
}
