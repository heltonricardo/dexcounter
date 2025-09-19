"use client";

import { useState, useEffect } from "react";
import { Pokemon } from "@/data/pokemons";
import PokemonCard from "@/components/PokemonCard";
import Image from "next/image";

export default function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPokemon = async () => {
            if (!searchQuery.trim()) {
                setPokemonList([]);
                return;
            }

            setLoading(true);
            try {
                const response = await fetch(`/api/pokemon?q=${encodeURIComponent(searchQuery)}`);
                const data = await response.json();
                setPokemonList(data);
            } catch (error) {
                console.error("Error fetching pokemon:", error);
                setPokemonList([]);
            } finally {
                setLoading(false);
            }
        };

        const debounceTimer = setTimeout(fetchPokemon, 300);
        return () => clearTimeout(debounceTimer);
    }, [searchQuery]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">PokéWeakness</h1>
                    <p className="text-gray-600">
                        Discover Pokémon type effectiveness and battle statistics
                    </p>
                </div>

                <div className="max-w-md mx-auto mb-8">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by name or number..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                        />
                        {loading && (
                            <div className="absolute right-3 top-3">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-6">
                    {pokemonList.length === 1 && <PokemonCard pokemon={pokemonList[0]} />}

                    {pokemonList.length > 1 && (
                        <div className="bg-white rounded-lg shadow p-4">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                                Found {pokemonList.length} Pokémon
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {pokemonList.map((pokemon) => (
                                    <div
                                        key={pokemon.pokedex_number}
                                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                                        onClick={() => setSearchQuery(pokemon.name)}
                                    >
                                        <Image
                                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.pokedex_number}.png`}
                                            alt={pokemon.name}
                                            className="w-12 h-12"
                                        />
                                        <div>
                                            <div className="font-medium text-gray-800">
                                                #
                                                {pokemon.pokedex_number.toString().padStart(3, "0")}{" "}
                                                {pokemon.name}
                                            </div>
                                            <div className="flex gap-1 mt-1">
                                                <span
                                                    className={`px-2 py-1 text-xs rounded-full text-white capitalize ${getTypeColor(
                                                        pokemon.type1
                                                    )}`}
                                                >
                                                    {pokemon.type1}
                                                </span>
                                                {pokemon.type2 && (
                                                    <span
                                                        className={`px-2 py-1 text-xs rounded-full text-white capitalize ${getTypeColor(
                                                            pokemon.type2
                                                        )}`}
                                                    >
                                                        {pokemon.type2}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {searchQuery && pokemonList.length === 0 && !loading && (
                        <div className="text-center py-8">
                            <p className="text-gray-500">
                                No Pokémon found for &quot;{searchQuery}&quot;
                            </p>
                        </div>
                    )}

                    {!searchQuery && (
                        <div className="text-center py-12">
                            <div className="text-gray-400 text-6xl mb-4">🔍</div>
                            <p className="text-gray-500 text-lg">
                                Start typing to search for a Pokémon!
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function getTypeColor(type: string): string {
    const colors: Record<string, string> = {
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
    return colors[type] || "bg-gray-400";
}
