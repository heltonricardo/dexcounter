import pokemons from "@/data/pokemons";
import Fuse from "fuse.js";
import { NextRequest, NextResponse } from "next/server";

const pokemonByNumber: Record<number, (typeof pokemons)[number]> = {};
pokemons.forEach(p => {
    pokemonByNumber[p.pokedexNumber] = p;
});

const fuse = new Fuse(pokemons, {
    keys: ["name"],
    threshold: 0.1,
});

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q")?.toLowerCase() || "";

    if (!query) {
        return NextResponse.json([]);
    }

    const num = Number(query);
    if (!isNaN(num) && pokemonByNumber[num]) {
        return NextResponse.json([pokemonByNumber[num]]);
    }

    const exactMatch = pokemons.find(p => p.name.toLowerCase() === query);
    if (exactMatch) {
        return NextResponse.json([exactMatch]);
    }

    const startsWithMatches = pokemons.filter(p => p.name.toLowerCase().startsWith(query));
    if (startsWithMatches.length) {
        return NextResponse.json(startsWithMatches);
    }

    const results = fuse.search(query).map(r => r.item);
    return NextResponse.json(results);
}
