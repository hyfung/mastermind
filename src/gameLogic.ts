export interface Color {
  id: string;
  label: string;
  hex: string;
}

export interface Feedback {
  blacks: number;
  whites: number;
}

export interface GuessEntry {
  colors: string[];
  feedback: Feedback;
}

export type GameStatus = 'playing' | 'won' | 'lost';

export interface GameState {
  secretCode: string[];
  guesses: GuessEntry[];
  currentGuess: (string | null)[];
  selectedSlot: number;
  gameStatus: GameStatus;
}

export const COLORS: Color[] = [
  { id: 'red',    label: 'Red',    hex: '#e74c3c' },
  { id: 'blue',   label: 'Blue',   hex: '#3498db' },
  { id: 'green',  label: 'Green',  hex: '#2ecc71' },
  { id: 'yellow', label: 'Yellow', hex: '#f1c40f' },
  { id: 'purple', label: 'Purple', hex: '#9b59b6' },
  { id: 'orange', label: 'Orange', hex: '#e67e22' },
];

export const CODE_LENGTH = 4;
export const MAX_TURNS = 10;

export function generateSecretCode(): string[] {
  return Array.from({ length: CODE_LENGTH }, () =>
    COLORS[Math.floor(Math.random() * COLORS.length)].id
  );
}

export function evaluateGuess(secret: string[], guess: string[]): Feedback {
  let blacks = 0;
  let whites = 0;

  const secretCopy: (string | null)[] = [...secret];
  const guessCopy: (string | null)[] = [...guess];

  for (let i = 0; i < CODE_LENGTH; i++) {
    if (guessCopy[i] === secretCopy[i]) {
      blacks++;
      secretCopy[i] = null;
      guessCopy[i] = null;
    }
  }

  for (let i = 0; i < CODE_LENGTH; i++) {
    if (guessCopy[i] === null) continue;
    const idx = secretCopy.indexOf(guessCopy[i]);
    if (idx !== -1) {
      whites++;
      secretCopy[idx] = null;
    }
  }

  return { blacks, whites };
}

export function createInitialState(): GameState {
  return {
    secretCode: generateSecretCode(),
    guesses: [],
    currentGuess: Array(CODE_LENGTH).fill(null),
    selectedSlot: 0,
    gameStatus: 'playing',
  };
}
