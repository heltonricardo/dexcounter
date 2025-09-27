import { abilities } from "@/data/abilities";
import { useEffect, useRef } from "react";
import tippy, { Instance } from "tippy.js";
import 'tippy.js/animations/shift-away-subtle.css';
import "tippy.js/dist/tippy.css";

interface AbilityTooltipProps {
    abilityName: string;
    children: React.ReactNode;
}

export default function AbilityTooltip({ abilityName, children }: AbilityTooltipProps) {
    const elementRef = useRef<HTMLSpanElement>(null);
    const tippyInstance = useRef<Instance | null>(null);

    useEffect(() => {
        if (elementRef.current) {
            const description = abilities[abilityName] || "Ability description not found";

            tippyInstance.current = tippy(elementRef.current, {
                arrow: true,
                touch: true,
                zIndex: 9999,
                maxWidth: 250,
                theme: "light",
                allowHTML: true,
                placement: "top",
                interactive: true,
                duration: [200, 150],
                animation: "shift-away-subtle",
                content: `<div class="text-sm">
                    <div class="font-semibold text-gray-900 mb-1">${abilityName}</div>
                    <div class="text-gray-700">${description}</div>
                </div>`,
            });
        }

        return () => {
            if (tippyInstance.current) {
                tippyInstance.current.destroy();
            }
        };
    }, [abilityName]);

    return (
        <span
            ref={elementRef}
            className={`
                inline-flex items-center gap-1 cursor-help border-b border-dashed border-blue-400
                text-blue-600 hover:text-blue-800 transition-colors duration-200
            `}
            role="button"
            tabIndex={0}
            aria-label={`View description for ${abilityName} ability`}
        >
            {children}
            <svg
                className="w-3 h-3 opacity-70"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
            >
                <path
                    fillRule="evenodd"
                    d={`
                        M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3
                        0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0
                        100-2zm0 8a1 1 0 100-2 1 1 0 000 2z
                    `}
                    clipRule="evenodd"
                />
            </svg>
        </span>
    );
}
