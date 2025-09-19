import { NextRequest, NextResponse } from "next/server";
import pokemons from "@/data/pokemons";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q")?.toLowerCase() || "";

    if (!query) {
        return NextResponse.json([]);
    }

    const filteredPokemons = pokemons.filter(
        (pokemon) =>
            pokemon.name.toLowerCase().includes(query) ||
            pokemon.pokedex_number.toString().includes(query)
    );

    return NextResponse.json(filteredPokemons);
}
