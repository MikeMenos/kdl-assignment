import { type FC, useState } from "react";
import type { InputInterface } from "../../interfaces";

const Input: FC<InputInterface> = ({
  type,
  name,
  placeholder,
  value,
  className,
  style,
  onChange,
  icon,
  required,
  closeIcon,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const formattedPlaceholder = required ? placeholder + "*" : placeholder;

  return (
    <div className="relative flex items-center pb-4">
      <i className="absolute pl-1">{icon}</i>
      {value && <i className="absolute right-0 pr-2">{closeIcon}</i>}
      <div className="flex w-full flex-col">
        <label
          htmlFor={placeholder}
          className={`absolute font-bold transition-all duration-500 ease-in-out ${
            (isFocused && !icon) || (value && !icon)
              ? "translate-y-2 opacity-100"
              : "translate-y-6 opacity-0"
          }`}
        >
          {formattedPlaceholder}
        </label>
        <input
          type={type}
          name={name}
          placeholder={isFocused ? "" : formattedPlaceholder}
          value={value}
          onChange={onChange}
          className={className}
          style={style}
          required={required}
          min={1}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
    </div>
  );
};

export default Input;
