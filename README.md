# Mastermind

A browser-based implementation of the classic Mastermind code-breaking game.

**Live demo:** https://hyfung.github.io/mastermind/

## How to Play

The game generates a secret code of 4 colored pegs chosen from 6 colors (Red, Blue, Green, Yellow, Purple, Orange). Duplicates are allowed.

1. Click a slot in the active row to select it.
2. Click a color from the picker to fill the slot.
3. Fill all 4 slots and click **Submit** to check your guess.
4. Use the feedback pegs to narrow down the code:
   - **Black peg** — correct color in the correct position
   - **White peg** — correct color in the wrong position
5. Crack the code within **10 guesses** to win.

## Tech Stack

- React 18 + TypeScript
- Vite
- No external UI libraries

## Development

```bash
npm install
npm run dev
```

## Deployment

Automatically deployed to GitHub Pages via GitHub Actions on every push to `master`.
