import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDebtStore, getMonthAmout } from "../../store/debts";
export default function DebtChart() {
  const { t } = useTranslation();
  const debts = useDebtStore((state) => state.debts);
  const getDebts = useDebtStore((state) => state.getDebts);
  const [year, setYear] = useState(() => new Date().getFullYear());
  const [showReceivable, setShowReceivable] = useState(true);
  const [showPayable, setShowPayable] = useState(true);
  const { receiable, payable } = getMonthAmout(debts, year);
  const months = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];
  const chartData = months.map((month, index) => ({
    month: t(month),
    receivable: receiable[index],
    payable: payable[index],
  }));
  useEffect(() => {
    getDebts();
  }, [getDebts]);
  return (
    <section className="chart-box surface">
      <div className="box-header">
        <h2>{t("monthlyOverview")}</h2>
        <select
          className="year-button"
          aria-label={t("chartYear")}
          value={year}
          onChange={(event) => setYear(Number(event.target.value))}
        >
          <option value={2027}>2027</option>
          <option value={2026}>2026</option>
          <option value={2025}>2025</option>
          <option value={2024}>2024</option>
        </select>
      </div>
      <div className="chart-content">
        <div className="chart-legend interactive-chart-legend">
          <button
            type="button"
            aria-pressed={showReceivable}
            onClick={() => setShowReceivable(!showReceivable)}
          >
            <i className="green-dot" />
            {t("lent")} ({t("receivable")})
          </button>
          <button
            type="button"
            aria-pressed={showPayable}
            onClick={() => setShowPayable(!showPayable)}
          >
            <i className="red-dot" />
            {t("borrowed")} ({t("payable")})
          </button>
        </div>
        <div className="monthly-debt-chart">
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{ top: 12, right: 12, bottom: 8, left: 0 }}
            >
              <CartesianGrid
                vertical={false}
                stroke="#e4e9f0"
                strokeDasharray="3 4"
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tickMargin={12}
                minTickGap={12}
                tick={{ fontSize: 12, fill: "#667788" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                width={48}
                domain={[0, "auto"]}
                allowDecimals={false}
                tick={{ fontSize: 12, fill: "#667788" }}
              />
              <Tooltip
                formatter={(value) => `${Number(value).toLocaleString()} TJS`}
                contentStyle={{
                  borderRadius: 8,
                  border: "1px solid #e4e9f0",
                  fontSize: 12,
                }}
              />
              <Area
                type="monotone"
                dataKey="receivable"
                name={t("receivable")}
                hide={!showReceivable}
                stroke="#27aa82"
                fill="#27aa82"
                fillOpacity={0.07}
                strokeWidth={2}
                dot={{ r: 3, fill: "#27aa82", strokeWidth: 0 }}
                activeDot={{ r: 5 }}
                isAnimationActive={false}
              />
              <Area
                type="monotone"
                dataKey="payable"
                name={t("payable")}
                hide={!showPayable}
                stroke="#f02032"
                fill="#f02032"
                fillOpacity={0.05}
                strokeWidth={2}
                dot={{ r: 3, fill: "#f02032", strokeWidth: 0 }}
                activeDot={{ r: 5 }}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
