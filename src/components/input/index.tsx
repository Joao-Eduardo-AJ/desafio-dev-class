import { useField } from "@unform/core";
import { useEffect, useRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const input = tv({
  base: "bg-white w-full text-nm text-start text-neutral800 cursor-text outline-0 p-2 placeholder:text-sd1 text-sd1 placeholder-neutral050",
  variants: {
    type: {
      text: "",
      outlined: "border-2 border-neutral002 focus:border-primaryDefault/50",
    },
  },
  defaultVariants: {
    type: "outlined",
  },
});

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  children?: ReactNode;
  variant?: VariantProps<typeof input>;
}
export const Input = ({
  name,
  label,
  variant,
  children,
  ...props
}: InputProps) => {
  const { fieldName, registerField, error, clearError } = useField(name);
  const inputRef = useRef(null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: ref => {
        return ref.current.value;
      },
      setValue: (ref, value) => {
        ref.current.value = value;
      },
      clearValue: ref => {
        ref.current.value = "";
      },
    });
  }, [registerField, fieldName]);

  return (
    <div className="">
      <label
        className=""
      >{label}
      <div>
        <input
          name={name}
          ref={inputRef}
          className={input(variant)}
          onFocus={() => error && clearError()}
          onKeyDown={() => error && clearError()}
          {...props}
          />
          {children}
        </div>
      </label>
      <span
        className={`text-auxiliaryRed text-sd2 text-left ${
          error ? "visible" : "hidden"
        }`}
      >
        {error}
      </span>
    </div>
  );
};