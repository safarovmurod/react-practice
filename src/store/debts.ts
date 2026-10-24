import { create } from "zustand";
import { axiosRequest } from "../token/token";
export interface Debt {
  id: string;
  amount: number;
  contact_id: string;
  due_date?: string | null;
  description?: string | null;
  status?: string;
  currency?: string;
  direction: string;
  created_at: string;
}
interface DebtStore {
  debts: Debt[];
  payments: Payment[];
  getPayments: () => Promise<void>;
  getDebts: () => Promise<void>;
  addDebt: (debt: NewDebt) => Promise<void>;
  addPayment: (debtId: string, amount: number, note: string) => Promise<void>;
}
export interface NewDebt {
  contact_id: string;
  direction: "they_owe_me" | "i_owe_them";
  amount: number;
  currency: string;
  due_date?: string;
  description?: string;
}
export const useDebtStore = create<DebtStore>((set, get) => ({
  debts: [],
  payments: [],
  getPayments: async () => {
    const payments: Payment[] = [];
    for (const debt of get().debts) {
      const { data } = await axiosRequest.get<Payment[]>(
        `/api/debts/${debt.id}/payments`,
      );
      payments.push(...data);
    }
    set({ payments });
  },
  getDebts: async () => {
    try {
      const { data } = await axiosRequest.get("/api/debts");
      set({ debts: data });
    } catch (error) {
      console.error(error);
    }
  },
  addPayment: async (debtId, amount, note) => {
    await axiosRequest.post(`/api/debts/${debtId}/payments`, {
      amount,
      note: note.trim() || undefined,
    });
    await get().getDebts();
    await get().getPayments();
  },
  addDebt: async (debt) => {
    const { data } = await axiosRequest.post("/api/debts", debt);
    set((state) => ({
      debts: [...state.debts, data],
    }));
  },
}));
export function getMonthAmout(debts: Debt[], year: number) {
  const receiable = Array(12).fill(0);
  const payable = Array(12).fill(0);
  for (const debt of debts) {
    const date = new Date(debt.created_at);
    if (date.getFullYear() !== year) continue;
    const month = date.getMonth();
    if (debt.direction === "they_owe_me") {
      receiable[month] += Number(debt.amount);
    }
    if (debt.direction === "i_owe_them") {
      payable[month] += Number(debt.amount);
    }
  }
  return { receiable, payable };
}
export async function getContactId(personName: string, folderId: string) {
  const name = personName.trim();
  if (!name) throw new Error("Номи шахсро навис.");
  const { data: contacts } = await axiosRequest.get("/api/contacts");
  const matches = contacts.filter(
    (contact: { name: string }) =>
      contact.name.trim().toLowerCase() === name.toLowerCase(),
  );
  if (matches.length > 1) {
    throw new Error(
      "Бо ҳамин ном чанд тамос ҳаст. Номҳоро дар Тамосҳо фарқ кун.",
    );
  }
  if (matches.length === 1) {
    const contact = matches[0];
    if (folderId && contact.folder_id !== folderId) {
      await axiosRequest.patch(`/api/contacts/${contact.id}`, {
        name: contact.name,
        folder_id: folderId,
      });
    }
    return contact.id as string;
  }
  const { data } = await axiosRequest.post("/api/contacts", {
    name,
    folder_id: folderId || undefined,
  });
  return data.id as string;
}
export interface RecentPayment {
  kind?: "debt" | "payment";
  id: string;
  contactName: string;
  amount: number;
  currency: string;
  direction: string;
  paid_at: string;
}
export interface Payment {
  debt_id: string;
  note?: string | null;
  id: string;
  amount: number;
  paid_at: string;
}
export async function getRecentPayments(debts: Debt[]) {
  const payments: RecentPayment[] = [];
  if (debts.length === 0) return payments;
  const { data: contacts } = await axiosRequest.get("/api/contacts");
  for (const debt of debts) {
    const { data } = await axiosRequest.get<Payment[]>(
      `/api/debts/${debt.id}/payments`,
    );
    const contact = contacts.find(
      (item: { id: string }) => item.id === debt.contact_id,
    );
    for (const payment of data) {
      payments.push({
        kind: "payment",
        id: payment.id,
        contactName: contact ? contact.name : "—",
        amount: Number(payment.amount),
        currency: debt.currency || "",
        direction: debt.direction,
        paid_at: payment.paid_at,
      });
    }
  }
  payments.sort(
    (a, b) => new Date(b.paid_at).getTime() - new Date(a.paid_at).getTime(),
  );
  return payments.slice(0, 5);
}
export function getPaidAmount(debtId: string, payments: Payment[]) {
  let paid = 0;
  for (const payment of payments) {
    if (payment.debt_id === debtId) paid += Number(payment.amount);
  }
  return paid;
}
export function getRemaining(debt: Debt, payments: Payment[]) {
  return Math.max(0, Number(debt.amount) - getPaidAmount(debt.id, payments));
}
