# DexCounter ⚡

[DexCounter](https://dexcounter.vercel.app/) is a web app to quickly search any Pokémon and see its stats, weaknesses, and resistances, helping you plan effective battle strategies.

## Data

- `app/data/pokemons.json`: indented source of truth. Edit/add entries here; Next.js minifies it at build time.
- The dataset is loaded client-side in a separate chunk during browser idle time, so searches are instant.
- `npm run convert`: regenerates `pokemons.json` from `scripts/legacy/pokemons.ts` (one-off migration; cleans ability names, removes duplicates, sorts by number, validates).
