import typeColor from "@/records/TypeColors";

interface TypeBadgeProps {
    type: string;
    size?: "sm" | "md" | "lg";
}

const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-2 text-base",
};

export default function TypeBadge({ type, size = "md" }: TypeBadgeProps) {
    return (
        <span
            className={`
        inline-block rounded-full font-semibold text-white capitalize
        ${typeColor(type)}
        ${sizeClasses[size]}
      `}
        >
            {type}
        </span>
    );
}
