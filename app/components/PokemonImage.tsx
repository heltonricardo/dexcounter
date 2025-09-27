import Image from "next/image";
import { useState } from "react";

type Collection = "pixel" | "dream" | "home" | "official" | "show";

const collections: Record<Collection, { path: string; ext: string }> = {
    pixel: { path: "", ext: "png" },
    dream: { path: "other/dream-world/", ext: "svg" },
    home: { path: "other/home/", ext: "png" },
    official: { path: "other/official-artwork/", ext: "png" },
    show: { path: "other/showdown/", ext: "gif" },
};

const order: Collection[] = ["dream", "home", "official", "pixel", "show"];
const baseUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

export default function PokemonImage({ pokedexNumber }: { pokedexNumber: number }) {
    const [index, setIndex] = useState(0);
    if (index >= order.length) return null;
    const { path, ext } = collections[order[index]];
    const src = `${baseUrl}${path}${pokedexNumber}.${ext}`;

    return (
        <Image
            fill
            src={src}
            className="object-contain"
            alt={`pokemon-${pokedexNumber}`}
            onError={() => setIndex(prev => prev + 1)}
        />
    );
}
