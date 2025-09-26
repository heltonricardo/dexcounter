type Collection = "pixel" | "dream" | "home" | "official" | "show";

const COLLECTION: Collection = "dream";

const collections: Record<Collection, { path: string; ext: string }> = {
    pixel: { path: "", ext: "png" },
    dream: { path: "other/dream-world/", ext: "svg" },
    home: { path: "other/home/", ext: "png" },
    official: { path: "other/official-artwork/", ext: "png" },
    show: { path: "other/showdown/", ext: "gif" },
};

function getPath(pokedexNumber: number) {
    const { path, ext } = collections[COLLECTION];
    return `/sprites/master/sprites/pokemon/${path}${pokedexNumber}.${ext}`;
}

export default function getImageUrl(pokedexNumber: number) {
    return `https://raw.githubusercontent.com/PokeAPI${getPath(pokedexNumber)}`;
}
