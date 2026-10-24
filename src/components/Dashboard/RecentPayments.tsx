import { getRecentActivities } from "../../store/activities";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDebtStore } from "../../store/debts";
import type { RecentPayment } from "../../store/debts";
import IncomingPayment from "./IncomingPayment";
import OutgoingPayment from "./OutgoingPayment";
export default function RecentPayments() {
  const { t, i18n } = useTranslation();
  const debts = useDebtStore((state) => state.debts);
  const [payments, setPayments] = useState<RecentPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    let active = true;
    async function loadPayments() {
      setLoading(true);
      setError(false);
      try {
        const data = await getRecentActivities(debts);
        if (active) setPayments(data);
      } catch (error) {
        console.error(error);
        if (active) setError(true);
      } finally {
        if (active) setLoading(false);
      }
    }
    loadPayments();
    return () => {
      active = false;
    };
  }, [debts]);
  return (
    <section className="payments-box surface">
      <h2 className="payments-heading">{t("recentActivities")}</h2>
      <div className="payments-content" aria-live="polite">
        {loading && <p>{t("paymentsLoading")}</p>}
        {!loading && error && <p role="alert">{t("paymentsLoadError")}</p>}
        {!loading && !error && payments.length === 0 && (
          <p>{t("activitiesEmpty")}</p>
        )}
        {!loading &&
          !error &&
          payments.map((payment) => {
            const date = new Date(payment.paid_at).toLocaleString(
              i18n.language,
              {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              },
            );
            const amount =
              `${payment.amount.toLocaleString(i18n.language)} ${payment.currency}`.trim();
            if (payment.direction === "they_owe_me") {
              return (
                <IncomingPayment
                  key={payment.id}
                  label={
                    payment.kind === "debt"
                      ? t("debtCreated")
                      : t("paymentRecord")
                  }
                  name={payment.contactName}
                  amount={amount}
                  date={date}
                />
              );
            }
            return (
              <OutgoingPayment
                key={payment.id}
                label={
                  payment.kind === "debt"
                    ? t("debtCreated")
                    : t("paymentRecord")
                }
                name={payment.contactName}
                amount={amount}
                date={date}
              />
            );
          })}
      </div>
    </section>
  );
}
