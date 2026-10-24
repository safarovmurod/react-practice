import { useState } from "react";
import type { ChangeEvent } from "react";
import ImagePlus from "@mui/icons-material/AddPhotoAlternateOutlined";
import { useTranslation } from "react-i18next";
export default function PhotoInput() {
  const { t } = useTranslation();
  const [preview, setPreview] = useState("");
  function showPhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPreview(String(reader.result));
    reader.readAsDataURL(file);
  }
  return (
    <div className="photo-field">
      <p>{t("photo")}</p>
      <label className="photo-input">
        {preview ? (
          <img src={preview} alt={t("photo")} />
        ) : (
          <>
            <ImagePlus />
            <span>{t("addPhoto")}</span>
          </>
        )}
        <input type="file" name="photo" accept="image/*" onChange={showPhoto} />
      </label>
    </div>
  );
}
