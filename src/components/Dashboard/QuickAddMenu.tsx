import { useState } from "react";
import { useTranslation } from "react-i18next";
import AddIcon from "@mui/icons-material/Add";
import PaymentsIcon from "@mui/icons-material/PaymentsRounded";
import DebtFormDialog from "./DebtFormDialog";
export default function QuickAddMenu() {
  const { t } = useTranslation();
  const [openForm, setOpenForm] = useState(false);
  const [direction, setDirection] = useState("receivable");
  function openDebt(type: string) {
    setDirection(type);
    setOpenForm(true);
  }
  return (
    <>
      <div className="quick-debt-add">
        <div className="quick-debt-options">
          <button
            type="button"
            className="quick-debt-option payable"
            onClick={() => openDebt("payable")}
          >
            <span>{t("payable")}</span>
            <i>
              <PaymentsIcon />
            </i>
          </button>
          <button
            type="button"
            className="quick-debt-option receivable"
            onClick={() => openDebt("receivable")}
          >
            <span>{t("receivable")}</span>
            <i>
              <PaymentsIcon />
            </i>
          </button>
        </div>
        <button
          type="button"
          className="button button-icon add-button"
          aria-label={t("addDebt")}
        >
          <AddIcon />
        </button>
      </div>
      <DebtFormDialog
        key={direction}
        open={openForm}
        onClose={() => setOpenForm(false)}
        direction={direction}
      />
    </>
  );
}
