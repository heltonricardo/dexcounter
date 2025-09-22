import { Pokemon } from "@/data/pokemons";
import getTypeColor from "../constants/TypeColors";

interface Props {
    pokemon: Pokemon;
    onClick: (pokemon: Pokemon) => void;
}

export default function PokemonListItem({ pokemon, onClick }: Props) {
    return (
        <div
            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            onClick={() => onClick(pokemon)}
        >
            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                {pokemon.pokedex_number}
            </div>
            <div>
                <div className="font-medium text-gray-800">{pokemon.name}</div>
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
    );
}
