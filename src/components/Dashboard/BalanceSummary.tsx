import TotalBalanceCard from "./TotalBalanceCard";
import ReceivableBalanceCard from "./ReceivableBalanceCard";
import PayableBalanceCard from "./PayableBalanceCard";
export default function BalanceSummary({
  direction = "",
  onDirection,
}: {
  direction?: string;
  onDirection?: (value: string) => void;
}) {
  return (
    <div className="balances">
      <TotalBalanceCard
        active={direction === ""}
        onClick={() => onDirection?.("")}
      />
      <ReceivableBalanceCard
        active={direction === "they_owe_me"}
        onClick={() => onDirection?.("they_owe_me")}
      />
      <PayableBalanceCard
        active={direction === "i_owe_them"}
        onClick={() => onDirection?.("i_owe_them")}
      />
    </div>
  );
}
