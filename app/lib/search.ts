import Fuse from "fuse.js";
import type { Pokemon } from "@/data/types";

interface NameEntry {
    name: string;
    i: number;
}

export interface PokemonIndex {
    all: Pokemon[];
    names: string[];
    fuse: Fuse<NameEntry>;
    byNumber: Map<number, Pokemon>;
}

export const normalize = (s: string) =>
    s
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();

let cache: Promise<PokemonIndex> | null = null;

export function loadIndex(): Promise<PokemonIndex> {
    if (!cache) {
        cache = import("@/data/pokemons.json").then(m => {
            const all = m.default as unknown as Pokemon[];
            const names = all.map(p => normalize(p.name));
            return {
                all,
                names,
                fuse: new Fuse(
                    names.map((name, i) => ({ name, i })),
                    { keys: ["name"], threshold: 0.1 }
                ),
                byNumber: new Map(all.map(p => [p.pokedexNumber, p])),
            };
        });
    }
    return cache;
}

export function search(index: PokemonIndex, raw: string): Pokemon[] {
    const q = normalize(raw).replace(/^#/, "");
    if (!q) return [];

    if (/^\d+$/.test(q)) {
        const byNum = index.byNumber.get(Number(q));
        if (byNum) return [byNum];
    }

    const exact = index.names.indexOf(q);
    if (exact !== -1) return [index.all[exact]];

    const starts = index.all.filter((_, i) => index.names[i].startsWith(q));
    if (starts.length) return starts;

    return index.fuse.search(q).map(r => index.all[r.item.i]);
}
