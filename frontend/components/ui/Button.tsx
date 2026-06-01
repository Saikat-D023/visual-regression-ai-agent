import { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary";
};

type LinkButtonProps = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary";
};

function buttonClass(variant: "primary" | "secondary" = "primary") {
  return `btn ${variant === "primary" ? "btn-primary" : "btn-secondary"}`;
}

export function Button({
  children,
  className = "",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button className={`${buttonClass(variant)} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function LinkButton({
  children,
  href,
  variant = "primary",
}: LinkButtonProps) {
  return (
    <Link href={href} className={buttonClass(variant)}>
      {children}
    </Link>
  );
}
