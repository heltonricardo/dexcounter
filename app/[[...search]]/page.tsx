"use client";

import PokemonCard from "@/components/PokemonCard";
import { Pokemon } from "@/data/pokemons";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import getTypeColor from "../constants/TypeColors";
import SearchHeader from "@/components/SearchHeader";

export default function SearchPage() {
    const router = useRouter();
    const params = useParams();
    const inputRef = useRef<HTMLInputElement>(null);

    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

    useEffect(() => {
        const urlSearch = params.search as string;
        if (urlSearch) {
            setSearchQuery(decodeURIComponent(urlSearch));
        }
        inputRef.current?.focus();
    }, [params.search]);

    useEffect(() => {
        if (searchQuery === "") {
            router.replace("/", { scroll: false });
        } else {
            router.replace(`/${encodeURIComponent(searchQuery)}`, { scroll: false });
        }
    }, [searchQuery, router]);

    useEffect(() => {
        if (!searchQuery) {
            setPokemonList([]);
            return;
        }

        setLoading(true);
        const fetchPokemon = async () => {
            try {
                const response = await fetch(`/api/pokemon?q=${encodeURIComponent(searchQuery)}`);
                const data = await response.json();
                setPokemonList(data);
            } catch (error) {
                console.error("Error fetching Pokémon:", error);
                setPokemonList([]);
            } finally {
                setLoading(false);
            }
        };

        const debounceTimer = setTimeout(fetchPokemon, 300);
        return () => clearTimeout(debounceTimer);
    }, [searchQuery]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handlePokemonClick = (pokemon: Pokemon) => {
        setSearchQuery(pokemon.name);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center">
            <div className="max-w-6xl mx-auto">
                <SearchHeader
                    loading={loading}
                    inputRef={inputRef}
                    searchQuery={searchQuery}
                    onChange={handleInputChange}
                />

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
                                        onClick={() => handlePokemonClick(pokemon)}
                                    >
                                        <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                                            {pokemon.pokedex_number}
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-800">
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

                    {!loading && searchQuery && pokemonList.length === 0 && (
                        <div className="text-center">
                            <p className="text-gray-500">
                                No Pokémon found for &quot;{searchQuery}&quot;
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
