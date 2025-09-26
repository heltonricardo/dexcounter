import pokemons from "@/data/pokemons";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q")?.toLowerCase() || "";

    if (!query) {
        return NextResponse.json([]);
    }

    const filteredPokemons = pokemons.filter(
        (pokemon) =>
            pokemon.name.toLowerCase().includes(query) ||
            pokemon.pokedexNumber.toString().includes(query)
    );

    const exactMatch = filteredPokemons.find(
        (pokemon) =>
            pokemon.name.toLowerCase() === query || pokemon.pokedexNumber.toString() === query
    );

    if (exactMatch) {
        return NextResponse.json([exactMatch]);
    }

    return NextResponse.json(filteredPokemons);
}
