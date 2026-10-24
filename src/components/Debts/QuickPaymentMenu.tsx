import { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import PaymentIcon from "@mui/icons-material/CurrencyExchangeRounded";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import PaymentFormDialog from "./PaymentFormDialog";
export default function QuickPaymentMenu() {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [openForm, setOpenForm] = useState(false);
  const [direction, setDirection] = useState("");
  function openPayment(type: string) {
    setDirection(type);
    setAnchorEl(null);
    setOpenForm(true);
  }
  return (
    <>
      <button
        type="button"
        className="button"
        aria-label={t("quickPayment")}
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        <PaymentIcon />
        <span className="button-label">{t("quickPayment")}</span>
      </button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => openPayment("they_owe_me")}>
          <AddIcon />
          {t("incoming")}
        </MenuItem>
        <MenuItem onClick={() => openPayment("i_owe_them")}>
          <RemoveIcon />
          {t("outgoing")}
        </MenuItem>
      </Menu>
      <PaymentFormDialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        quick
        direction={direction}
      />
    </>
  );
}
