import getImageUrl from "@/constants/Image";
import { Pokemon } from "@/data/pokemons";
import Image from "next/image";
import TypeBadge from "./TypeBadge";

interface PokemonCardProps {
    pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
    const damageGroups = {
        "4x": [] as string[],
        "2x": [] as string[],
        "1x": [] as string[],
        "0.5x": [] as string[],
        "0.25x": [] as string[],
        "0x": [] as string[],
    };

    const damageMappings = [
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
    ];

    damageMappings.forEach(({ type, value }) => {
        if (value === 4) {
            damageGroups["4x"].push(type);
        } else if (value === 2) {
            damageGroups["2x"].push(type);
        } else if (value === 1) {
            damageGroups["1x"].push(type);
        } else if (value === 0.5) {
            damageGroups["0.5x"].push(type);
        } else if (value === 0.25) {
            damageGroups["0.25x"].push(type);
        } else if (value === 0) {
            damageGroups["0x"].push(type);
        }
    });

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-6 mb-6 justify-between items-stretch">
                <div className="flex flex-col items-center lg:w-1/2">
                    <div className="relative w-48 h-48 mb-4">
                        <Image
                            fill
                            alt={pokemon.name}
                            className="object-contain"
                            src={getImageUrl(pokemon.pokedex_number)}
                        />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 text-center">
                        #{pokemon.pokedex_number} {pokemon.name}
                    </h2>
                    <div className="flex gap-2 mt-5">
                        <TypeBadge type={pokemon.type1} size="lg" />
                        {pokemon.type2 && <TypeBadge type={pokemon.type2} size="lg" />}
                    </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 lg:w-1/2">
                    <h3 className="text-xl font-semibold text-gray-800">Stats</h3>
                    <div className="space-y-3 h-full flex flex-col justify-center">
                        <div className="flex justify-between gap-16">
                            <span className="font-medium text-gray-700">Speed</span>
                            <span className="text-blue-600 font-bold">{pokemon.speed}</span>
                        </div>
                        <div className="flex justify-between gap-16">
                            <span className="font-medium text-gray-700">Defense</span>
                            <span className="text-green-600 font-bold">{pokemon.defense}</span>
                        </div>
                        <div className="flex justify-between gap-16">
                            <span className="font-medium text-gray-700">Sp. Defense</span>
                            <span className="text-purple-600 font-bold">{pokemon.sp_defense}</span>
                        </div>
                        <div className="flex justify-between gap-16">
                            <span className="font-medium text-gray-700">Weight</span>
                            <span className="text-orange-600 font-bold">
                                {pokemon.weight_kg} kg
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Damage Taken</h3>
                <div className="space-y-8">
                    {(["4x", "2x", "1x", "0.5x", "0.25x", "0x"] as const).map((multiplier) => {
                        const types = damageGroups[multiplier];
                        if (types.length === 0) return null;

                        const displayMultiplier = multiplier.replace("x", " ×");

                        return (
                            <div key={multiplier}>
                                <h4 className="font-semibold text-gray-700 mb-2">
                                    {displayMultiplier}
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {types.map((type) => (
                                        <TypeBadge key={type} type={type} size="md" />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
