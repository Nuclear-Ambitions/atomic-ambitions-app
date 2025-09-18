import * as Phosphor from "@phosphor-icons/react";
import React from "react";

interface IconProps {
  name: keyof typeof Phosphor; // e.g., "House", "Star", "Heart"
  // name: string; // e.g., "House", "Star", "Heart"
  size?: number | string;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
  color?: string;
  className?: string;
  // Add other props as needed (e.g., onClick)
}

const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  weight = "regular",
  color,
  className,
  ...props
}) => {
  // const PhosphorIcon = Phosphor[name];
  const PhosphorIcon = Phosphor[name] as Phosphor.Icon | undefined;

  if (!PhosphorIcon) {
    console.warn(`Icon "${name}" not found in Phosphor Icons`);
    return null; // Or fallback to a default icon/error placeholder
  }

  return (
    <PhosphorIcon
      size={size}
      weight={weight}
      color={color}
      className={className}
      {...props}
    />
  );
};

export default Icon;
