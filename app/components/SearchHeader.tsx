import Link from "next/link";
import { Ref } from "react";

interface SearchHeaderProps {
    loading: boolean;
    searchQuery: string;
    inputRef: Ref<HTMLInputElement>;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchHeader({
    searchQuery,
    onChange,
    loading,
    inputRef,
}: SearchHeaderProps) {
    return (
        <div className="text-center mb-8 px-2 sm:px-4">
            <h1>
                <Link
                    href="/"
                    className="text-5xl sm:text-6xl md:text-8xl font-bold text-gray-800 mb-2"
                >
                    DexCounter
                </Link>
            </h1>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-6">
                Explore Pokémon weaknesses, resistances, and stats •{" "}
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://helton.vercel.app"
                    className={`
                        inline-flex items-center
                        hover:text-gray-900 transition-colors duration-200"`}
                >
                    By Helton
                    <svg
                        className="w-3 h-3 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d={`M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0
                                0v6m0-6L10 14`}
                        />
                    </svg>
                </a>
            </p>

            <div className="max-w-md sm:max-w-lg mx-auto relative">
                <input
                    type="text"
                    ref={inputRef}
                    onChange={onChange}
                    value={searchQuery}
                    placeholder="Search name or enter National number"
                    className={`
                        w-full px-4 py-3 rounded-full
                        border border-gray-400 shadow-sm focus:outline-none
                    `}
                />
                {loading && (
                    <div className="absolute right-3 top-3">
                        <div
                            className={`
                            animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500
                        `}
                        ></div>
                    </div>
                )}
            </div>
        </div>
    );
}
