import getTypeColor from "@/constants/TypeColors";

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
                ${sizeClasses[size]}
                relative inline-block rounded-full font-semibold capitalize overflow-hidden
  `}
        >
            <span className={`absolute inset-0 ${getTypeColor(type)} dark:brightness-65`} />
            <span className="relative text-white dark:text-gray-200">{type}</span>
        </span>
    );
}
