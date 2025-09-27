import { Pokemon } from "@/data/pokemons";
import PokemonCard from "./PokemonCard";
import PokemonListItem from "./PokemonListItem";

interface Props {
    pokemonList: Pokemon[];
    onPokemonClick: (pokemon: Pokemon) => void;
}

export default function PokemonList({ pokemonList, onPokemonClick }: Props) {
    if (pokemonList.length === 1) {
        return <PokemonCard pokemon={pokemonList[0]} />;
    }

    if (pokemonList.length > 1) {
        return (
            <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Found {pokemonList.length} Pokémon
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {pokemonList.map(pokemon => (
                        <PokemonListItem
                            key={pokemon.pokedexNumber}
                            pokemon={pokemon}
                            onClick={onPokemonClick}
                        />
                    ))}
                </div>
            </div>
        );
    }

    return null;
}
