export type PokemonType =
    | "bug"
    | "dark"
    | "dragon"
    | "electric"
    | "fairy"
    | "fighting"
    | "fire"
    | "flying"
    | "ghost"
    | "grass"
    | "ground"
    | "ice"
    | "normal"
    | "poison"
    | "psychic"
    | "rock"
    | "steel"
    | "water";

export interface Pokemon {
    abilities: string[];
    againstBug: number;
    againstDark: number;
    againstDragon: number;
    againstElectric: number;
    againstFairy: number;
    againstFight: number;
    againstFire: number;
    againstFlying: number;
    againstGhost: number;
    againstGrass: number;
    againstGround: number;
    againstIce: number;
    againstNormal: number;
    againstPoison: number;
    againstPsychic: number;
    againstRock: number;
    againstSteel: number;
    againstWater: number;
    attack: number;
    baseEggSteps: number;
    baseHappiness: number;
    baseTotal: number;
    captureRate: number;
    classification: string;
    defense: number;
    experienceGrowth: number;
    heightM: number | null;
    hp: number;
    japoneseName: string;
    name: string;
    percentageMale: number | null;
    pokedexNumber: number;
    spAttack: number;
    spDefense: number;
    speed: number;
    type1: PokemonType;
    type2: PokemonType | null;
    weightKg: number | null;
    generation: number;
    isLegendary: number;
}
