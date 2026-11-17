import { abilities } from "@/data/abilities";

const key = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

const lookup = new Map<string, string>();
for (const [name, description] of Object.entries(abilities)) {
    lookup.set(key(name), description);
}

export function getAbilityDescription(name: string): string {
    return lookup.get(key(name)) || "Ability description not found";
}
