interface Props {
    query: string;
}

export default function NoResults({ query }: Props) {
    return (
        <div className="text-center">
            <p className="text-gray-500">No Pokémon found for &quot;{query}&quot;</p>
        </div>
    );
}
