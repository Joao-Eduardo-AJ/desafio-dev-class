/* eslint-disable jsx-a11y/alt-text */
import Image, { ImageProps } from "next/image";
import type { ButtonHTMLAttributes } from "react";

import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
  base: "bg-primaryDefault text-white w-full py-2 hover:bg-primaryDark transition duration-500",
  variants: {
    type: {
      text: "",
      contained:
        "",
      outlined:
        "",
    },
  },
  defaultVariants: {
    type: "text",
  },
});

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: VariantProps<typeof button>;
}

export function Root({ variant, ...props }: IButton) {
  return <button {...props} className={button(variant)} />;
}

export function Icon(props: ImageProps) {
  return <Image {...props} />;
}