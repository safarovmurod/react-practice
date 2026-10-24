import type { ChangeEvent } from "react";
type Props = {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
  required?: boolean;
  value?: string;
  placeholder?: string;
  list?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};
export default function FormInput({
  label,
  name,
  type = "text",
  defaultValue = "",
  required = false,
  value,
  placeholder = " ",
  list,
  onChange,
}: Props) {
  return (
    <div className="form-field outlined-field">
      <label htmlFor={name} className="form-label">
        {label}
        {required && " *"}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        defaultValue={value === undefined ? defaultValue : undefined}
        step={type === "number" ? "any" : undefined}
        required={required}
        placeholder={placeholder}
        list={list}
      />
    </div>
  );
}
