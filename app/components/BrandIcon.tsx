import type { SimpleIcon } from "simple-icons";

export function BrandIcon({
  icon,
  size = 20,
  color,
  className,
}: {
  icon: SimpleIcon;
  size?: number;
  color?: string;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ color: color || `#${icon.hex}` }}
    >
      <path d={icon.path} />
    </svg>
  );
}
