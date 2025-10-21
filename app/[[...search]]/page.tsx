"use client";

import NoResults from "@/components/NoResults";
import PokemonList from "@/components/PokemonList";
import SearchHeader from "@/components/SearchHeader";
import { Pokemon } from "@/data/pokemons";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function SearchPage() {
    const router = useRouter();
    const params = useParams();
    const inputRef = useRef<HTMLInputElement>(null);

    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

    useEffect(() => {
        const urlSearch = params.search as string;
        if (urlSearch) setSearchQuery(decodeURIComponent(urlSearch));
        inputRef.current?.focus();
    }, [params.search]);

    useEffect(() => {
        if (!searchQuery) router.replace("/", { scroll: false });
        else router.replace(`/${encodeURIComponent(searchQuery)}`, { scroll: false });
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
            } catch {
                setPokemonList([]);
            } finally {
                setLoading(false);
            }
        };

        const debounceTimer = setTimeout(fetchPokemon, 300);
        return () => clearTimeout(debounceTimer);
    }, [searchQuery]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setSearchQuery(e.target.value);

    const handlePokemonClick = (pokemon: Pokemon) => setSearchQuery(pokemon.name);

    return (
        <div
            className={`
                min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center
                dark:from-slate-900 dark:to-gray-950
            `}
        >
            <div className="max-w-6xl mx-auto">
                <SearchHeader
                    loading={loading}
                    inputRef={inputRef}
                    searchQuery={searchQuery}
                    onChange={handleInputChange}
                />

                <div className="space-y-6">
                    <PokemonList pokemonList={pokemonList} onPokemonClick={handlePokemonClick} />
                    {!loading && searchQuery && pokemonList.length === 0 && (
                        <NoResults query={searchQuery} />
                    )}
                </div>
            </div>
        </div>
    );
}
