interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: string;
}

export default function Spinner({ size = "md", color = "currentColor" }: SpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-5 h-5 border-2",
    lg: "w-6 h-6 border-3",
  };

  return (
    <div
      className={`${sizeClasses[size]} border-t-transparent rounded-full animate-spin`}
      style={{ borderColor: color, borderTopColor: "transparent" }}
    />
  );
}
