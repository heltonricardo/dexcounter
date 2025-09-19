interface TypeBadgeProps {
    type: string;
    size?: "sm" | "md" | "lg";
}

const typeColors: Record<string, string> = {
    normal: "bg-gray-400",
    fire: "bg-red-500",
    water: "bg-blue-500",
    electric: "bg-yellow-400",
    grass: "bg-green-500",
    ice: "bg-cyan-300",
    fighting: "bg-red-700",
    poison: "bg-purple-500",
    ground: "bg-yellow-600",
    flying: "bg-indigo-400",
    psychic: "bg-pink-500",
    bug: "bg-green-400",
    rock: "bg-yellow-800",
    ghost: "bg-purple-700",
    dragon: "bg-indigo-700",
    dark: "bg-gray-800",
    steel: "bg-gray-500",
    fairy: "bg-pink-300",
};

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
        ${typeColors[type] || "bg-gray-400"}
        ${sizeClasses[size]}
      `}
        >
            {type}
        </span>
    );
}
