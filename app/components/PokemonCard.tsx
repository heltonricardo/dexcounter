import { Pokemon } from "@/data/pokemons";
import AbilityTooltip from "./AbilityTooltip";
import PokemonImage from "./PokemonImage";
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
        { type: "bug", value: pokemon.againstBug },
        { type: "dark", value: pokemon.againstDark },
        { type: "dragon", value: pokemon.againstDragon },
        { type: "electric", value: pokemon.againstElectric },
        { type: "fairy", value: pokemon.againstFairy },
        { type: "fighting", value: pokemon.againstFight },
        { type: "fire", value: pokemon.againstFire },
        { type: "flying", value: pokemon.againstFlying },
        { type: "ghost", value: pokemon.againstGhost },
        { type: "grass", value: pokemon.againstGrass },
        { type: "ground", value: pokemon.againstGround },
        { type: "ice", value: pokemon.againstIce },
        { type: "normal", value: pokemon.againstNormal },
        { type: "poison", value: pokemon.againstPoison },
        { type: "psychic", value: pokemon.againstPsychic },
        { type: "rock", value: pokemon.againstRock },
        { type: "steel", value: pokemon.againstSteel },
        { type: "water", value: pokemon.againstWater },
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
        <main className={`
            bg-white rounded-lg shadow-lg p-6 max-w-3xl lg:min-w-3xl mx-auto dark:bg-slate-800
        `}>
            <article className="flex flex-col lg:flex-row gap-5 mb-5 justify-between items-stretch">
                <section className="flex flex-col items-center lg:w-1/2 justify-evenly">
                    <div className="relative w-48 h-48 mb-4">
                        <PokemonImage pokedexNumber={pokemon.pokedexNumber} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 text-center">
                        #{pokemon.pokedexNumber} {pokemon.name}
                    </h2>
                    <div className="flex gap-2 mt-5">
                        <TypeBadge type={pokemon.type1} size="lg" />
                        {pokemon.type2 && <TypeBadge type={pokemon.type2} size="lg" />}
                    </div>
                </section>

                <section className="flex flex-col gap-5 lg:w-1/2 justify-evenly">
                    <aside className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-4 flex-1">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">Stats</h3>
                        <div className="flex flex-col justify-center">
                            <div className="flex justify-between gap-16">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Speed</span>
                                <span className="text-blue-600 font-bold">{pokemon.speed}</span>
                            </div>
                            <div className="flex justify-between gap-16">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Defense</span>
                                <span className="text-green-600 font-bold">{pokemon.defense}</span>
                            </div>
                            <div className="flex justify-between gap-16">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Sp. Defense</span>
                                <span className="text-purple-600 font-bold">
                                    {pokemon.spDefense}
                                </span>
                            </div>
                            <div className="flex justify-between gap-16">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Weight</span>
                                <span className="text-orange-600 dark:text-orange-700 font-bold">
                                    {pokemon.weightKg ? `${pokemon.weightKg} kg` : "?"}
                                </span>
                            </div>
                        </div>
                    </aside>
                    <aside className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-4 flex-1">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">Abilities</h3>
                        <div className="flex flex-col justify-center">
                            <div className="h-full flex flex-col justify-center">
                                <div className="flex flex-wrap gap-2">
                                    {pokemon.abilities.sort().map((ability, index) => (
                                        <span key={ability}>
                                            <AbilityTooltip abilityName={ability}>
                                                {ability}
                                            </AbilityTooltip>
                                            {index < pokemon.abilities.length - 1 && (
                                                <span className="text-gray-400 ml-2 dark:text-gray-300">•</span>
                                            )}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>
                </section>
            </article>

            <article className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Damage Taken</h3>
                <div className="space-y-8">
                    {(["4x", "2x", "1x", "0.5x", "0.25x", "0x"] as const).map(multiplier => {
                        const types = damageGroups[multiplier];
                        if (types.length === 0) return null;

                        const displayMultiplier = multiplier.replace("x", " ×");

                        return (
                            <div key={multiplier}>
                                <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    {displayMultiplier}
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {types.map(type => (
                                        <TypeBadge key={type} type={type} size="md" />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </article>
        </main>
    );
}
