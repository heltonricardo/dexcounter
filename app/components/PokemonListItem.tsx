import { Pokemon } from "@/data/pokemons";
import TypeBadge from "./TypeBadge";

interface Props {
    pokemon: Pokemon;
    onClick: (pokemon: Pokemon) => void;
}

export default function PokemonListItem({ pokemon, onClick }: Props) {
    return (
        <div
            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer dark:bg-slate-700/50 dark:hover:bg-slate-700"
            onClick={() => onClick(pokemon)}
        >
            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 dark:bg-slate-700/50">
                {pokemon.pokedexNumber}
            </div>
            <div>
                <div className="font-medium text-gray-800 dark:text-gray-300">{pokemon.name}</div>
                <div className="flex gap-1 mt-1">
                    <TypeBadge type={pokemon.type1} size="sm" />
                    {pokemon.type2 && <TypeBadge type={pokemon.type2} size="sm" />}
                </div>
            </div>
        </div>
    );
}
