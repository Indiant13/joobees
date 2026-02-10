import type { ButtonHTMLAttributes } from "react";

export type UserAvatarButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  name: string;
  avatarUrl?: string;
};

export function UserAvatarButton({
  name,
  avatarUrl,
  className = "",
  ...props
}: UserAvatarButtonProps) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <button
      type="button"
      aria-label="Open user menu"
      className={`flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-blue-300/40 bg-blue-900/40 text-xs font-semibold text-white transition hover:border-white ${className}`}
      {...props}
    >
      {avatarUrl ? (
        <img src={avatarUrl} alt={name} className="h-full w-full object-cover" />
      ) : (
        <span>{initials}</span>
      )}
    </button>
  );
}
