import type { Metadata } from "next";
import { Encode_Sans_Semi_Expanded } from "next/font/google";
import "./globals.css";

const font = Encode_Sans_Semi_Expanded({
    weight: "600",
});

export const metadata: Metadata = {
    title: "DexCounter",
    description: "Explore Pokémon weaknesses, resistances, and stats",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={font.className}>{children}</body>
        </html>
    );
}
