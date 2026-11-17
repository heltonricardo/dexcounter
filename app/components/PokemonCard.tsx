import type { Pokemon } from "@/data/types";
import AbilityTooltip from "./AbilityTooltip";
import PokemonImage from "./PokemonImage";
import TypeBadge from "./TypeBadge";

interface PokemonCardProps {
    pokemon: Pokemon;
}

type AgainstKey = Extract<keyof Pokemon, `against${string}`>;

const damageTypes: [string, AgainstKey][] = [
    ["bug", "againstBug"],
    ["dark", "againstDark"],
    ["dragon", "againstDragon"],
    ["electric", "againstElectric"],
    ["fairy", "againstFairy"],
    ["fighting", "againstFight"],
    ["fire", "againstFire"],
    ["flying", "againstFlying"],
    ["ghost", "againstGhost"],
    ["grass", "againstGrass"],
    ["ground", "againstGround"],
    ["ice", "againstIce"],
    ["normal", "againstNormal"],
    ["poison", "againstPoison"],
    ["psychic", "againstPsychic"],
    ["rock", "againstRock"],
    ["steel", "againstSteel"],
    ["water", "againstWater"],
];

const multipliers = [4, 2, 1, 0.5, 0.25, 0];

export default function PokemonCard({ pokemon }: PokemonCardProps) {
    const abilities = [...pokemon.abilities].sort();

    const damageGroups = multipliers
        .map(multiplier => ({
            multiplier,
            types: damageTypes
                .filter(([, key]) => pokemon[key] === multiplier)
                .map(([type]) => type),
        }))
        .filter(group => group.types.length > 0);

    return (
        <main
            className={`
                bg-white rounded-lg shadow-lg p-6 max-w-3xl lg:min-w-3xl mx-auto dark:bg-slate-800
            `}
        >
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
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                            Stats
                        </h3>
                        <div className="flex flex-col justify-center">
                            <div className="flex justify-between gap-16">
                                <span className="font-medium text-gray-700 dark:text-gray-300">
                                    Speed
                                </span>
                                <span className="text-blue-600 font-bold">{pokemon.speed}</span>
                            </div>
                            <div className="flex justify-between gap-16">
                                <span className="font-medium text-gray-700 dark:text-gray-300">
                                    Defense
                                </span>
                                <span className="text-green-600 font-bold">{pokemon.defense}</span>
                            </div>
                            <div className="flex justify-between gap-16">
                                <span className="font-medium text-gray-700 dark:text-gray-300">
                                    Sp. Defense
                                </span>
                                <span className="text-purple-600 font-bold">
                                    {pokemon.spDefense}
                                </span>
                            </div>
                            <div className="flex justify-between gap-16">
                                <span className="font-medium text-gray-700 dark:text-gray-300">
                                    Weight
                                </span>
                                <span className="text-orange-600 dark:text-orange-700 font-bold">
                                    {pokemon.weightKg ? `${pokemon.weightKg} kg` : "?"}
                                </span>
                            </div>
                        </div>
                    </aside>
                    <aside className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-4 flex-1">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                            Abilities
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {abilities.map((ability, index) => (
                                <span key={ability}>
                                    <AbilityTooltip abilityName={ability}>{ability}</AbilityTooltip>
                                    {index < abilities.length - 1 && (
                                        <span className="text-gray-400 ml-2 dark:text-gray-300">
                                            •
                                        </span>
                                    )}
                                </span>
                            ))}
                        </div>
                    </aside>
                </section>
            </article>

            <article className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    Damage Taken
                </h3>
                <div className="space-y-8">
                    {damageGroups.map(({ multiplier, types }) => (
                        <div key={multiplier}>
                            <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                {multiplier} ×
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {types.map(type => (
                                    <TypeBadge key={type} type={type} size="md" />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </article>
        </main>
    );
}
