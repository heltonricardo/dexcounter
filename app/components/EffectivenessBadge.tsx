interface EffectivenessBadgeProps {
    effectiveness: number;
    type: string;
}

const getEffectivenessColor = (value: number): string => {
    if (value === 4) return "bg-blue-600 text-white";
    if (value === 2) return "bg-green-500 text-white";
    if (value === 1) return "bg-gray-400 text-white";
    if (value === 0.5) return "bg-orange-500 text-white";
    if (value === 0.25) return "bg-red-600 text-white";
    if (value === 0) return "bg-black text-white";
    return "bg-gray-400 text-white";
};

const getEffectivenessText = (value: number): string => {
    if (value === 4) return "4×";
    if (value === 2) return "2×";
    if (value === 1) return "1×";
    if (value === 0.5) return "½×";
    if (value === 0.25) return "¼×";
    if (value === 0) return "0×";
    return `${value}×`;
};

export default function EffectivenessBadge({ effectiveness, type }: EffectivenessBadgeProps) {
    return (
        <div className="flex items-center gap-2">
            <span
                className={`
          inline-block rounded-full font-bold px-3 py-1 text-sm min-w-[45px] text-center
          ${getEffectivenessColor(effectiveness)}
        `}
            >
                {getEffectivenessText(effectiveness)}
            </span>
            <span className="capitalize font-medium text-gray-700">{type.replace("_", " ")}</span>
        </div>
    );
}
