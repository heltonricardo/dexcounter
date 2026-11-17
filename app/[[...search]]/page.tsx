"use client";

import NoResults from "@/components/NoResults";
import PokemonList from "@/components/PokemonList";
import SearchHeader from "@/components/SearchHeader";
import type { Pokemon } from "@/data/types";
import { loadIndex, PokemonIndex, search } from "@/lib/search";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

export default function SearchPage() {
    const params = useParams();
    const inputRef = useRef<HTMLInputElement>(null);

    const [index, setIndex] = useState<PokemonIndex | null>(null);
    const [searchQuery, setSearchQuery] = useState(() => {
        const raw = params.search;
        const value = Array.isArray(raw) ? raw[0] : raw;
        if (!value) return "";
        try {
            return decodeURIComponent(value);
        } catch {
            return value;
        }
    });

    useEffect(() => {
        inputRef.current?.focus();
        const run = () => loadIndex().then(setIndex);
        if ("requestIdleCallback" in window) {
            const id = requestIdleCallback(run, { timeout: 1000 });
            return () => cancelIdleCallback(id);
        }
        const timer = setTimeout(run, 0);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const path = searchQuery ? `/${encodeURIComponent(searchQuery)}` : "/";
        window.history.replaceState(null, "", path);
    }, [searchQuery]);

    useEffect(() => {
        if (searchQuery) loadIndex().then(setIndex);
    }, [searchQuery]);

    const pokemonList = useMemo(
        () => (index ? search(index, searchQuery) : []),
        [index, searchQuery]
    );

    const loading = !!searchQuery && !index;

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
