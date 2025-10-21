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
        <header className="flex flex-col justify-center mb-8 px-2 sm:px-4">
            <h1 className="flex justify-center">
                <Link
                    href="/"
                    className={`
                        text sm:leading-14 md:leading-20 text-5xl sm:text-6xl
                        md:text-8xl font-bold text-gray-800 mb-1 dark:text-gray-300
                    `}
                >
                    DexCounter
                </Link>
            </h1>

            <div
                className={`
                    flex flex-col justify-center items-center
                    text-gray-600 dark:text-gray-600 mb-6 text-sm md:text-lg md:flex-row
                `}
            >
                Explore Pokémon weaknesses, resistances, and stats
                <span className="mx-1 hidden md:inline">•</span>
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://helton.vercel.app"
                    className={`
                        inline-flex items-center text-nowrap
                        hover:text-gray-900 transition-colors duration-200 dark:hover:text-gray-700
                    `}
                >
                    By Helton
                    <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-3 h-3 ml-1"
                    >
                        <path
                            strokeWidth={2.7}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d={`M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0
                                0v6m0-6L10 14`}
                        />
                    </svg>
                </a>
            </div>

            <div className="max-w-md sm:max-w-lg mx-auto relative w-full">
                <input
                    type="text"
                    ref={inputRef}
                    onChange={onChange}
                    value={searchQuery}
                    placeholder="Search name or enter National number"
                    className={`
                        w-full px-4 py-3 rounded-full
                        border border-gray-400 dark:border-gray-600 dark:text-gray-400 shadow-sm focus:outline-none
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
        </header>
    );
}
