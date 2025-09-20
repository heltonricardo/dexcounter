import { Pokemon } from "@/data/pokemons";
import Image from "next/image";
import EffectivenessBadge from "./EffectivenessBadge";
import TypeBadge from "./TypeBadge";

interface PokemonCardProps {
    pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
    const effectivenessData = [
        { type: "bug", value: pokemon.against_bug },
        { type: "dark", value: pokemon.against_dark },
        { type: "dragon", value: pokemon.against_dragon },
        { type: "electric", value: pokemon.against_electric },
        { type: "fairy", value: pokemon.against_fairy },
        { type: "fighting", value: pokemon.against_fight },
        { type: "fire", value: pokemon.against_fire },
        { type: "flying", value: pokemon.against_flying },
        { type: "ghost", value: pokemon.against_ghost },
        { type: "grass", value: pokemon.against_grass },
        { type: "ground", value: pokemon.against_ground },
        { type: "ice", value: pokemon.against_ice },
        { type: "normal", value: pokemon.against_normal },
        { type: "poison", value: pokemon.against_poison },
        { type: "psychic", value: pokemon.against_psychic },
        { type: "rock", value: pokemon.against_rock },
        { type: "steel", value: pokemon.against_steel },
        { type: "water", value: pokemon.against_water },
    ].sort((a, b) => b.value - a.value);

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center md:items-start">
                    <div className="relative w-48 h-48 mb-4">
                        <Image
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.pokedex_number}.png`}
                            alt={pokemon.name}
                            fill
                            className="object-contain"
                        />
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center w-full">
                        #{pokemon.pokedex_number.toString().padStart(3, "0")} {pokemon.name}
                    </h2>

                    <div className="flex gap-2 mb-4 w-full justify-center">
                        <TypeBadge type={pokemon.type1} size="lg" />
                        {pokemon.type2 && <TypeBadge type={pokemon.type2} size="lg" />}
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 w-full">
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="font-medium">Speed:</span>
                                <span className="text-blue-600 font-bold">{pokemon.speed}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Defense:</span>
                                <span className="text-green-600 font-bold">{pokemon.defense}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Sp. Defense:</span>
                                <span className="text-purple-600 font-bold">
                                    {pokemon.sp_defense}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Type Effectiveness</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {effectivenessData.map(({ type, value }) => (
                                <EffectivenessBadge key={type} effectiveness={value} type={type} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
