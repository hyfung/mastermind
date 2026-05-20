import { useState, useCallback } from 'react';
import {
  createInitialState,
  evaluateGuess,
  CODE_LENGTH,
  MAX_TURNS,
  type GameState,
  type GameStatus,
  type Feedback,
} from './gameLogic';
import GuessRow from './components/GuessRow';
import ColorPicker from './components/ColorPicker';
import SecretCode from './components/SecretCode';
import './App.css';

type RowState =
  | { type: 'past'; guess: string[]; feedback: Feedback; rowNumber: number }
  | { type: 'active'; rowNumber: number }
  | { type: 'empty'; rowNumber: number };

export default function App() {
  const [state, setState] = useState<GameState>(createInitialState);

  const { secretCode, guesses, currentGuess, selectedSlot, gameStatus } = state;

  const handleSlotClick = useCallback((slotIndex: number) => {
    if (gameStatus !== 'playing') return;
    setState(s => ({ ...s, selectedSlot: slotIndex }));
  }, [gameStatus]);

  const handleColorSelect = useCallback((colorId: string) => {
    if (gameStatus !== 'playing') return;
    setState(s => {
      const newGuess = [...s.currentGuess];
      newGuess[s.selectedSlot] = colorId;
      const nextEmpty = newGuess.findIndex((v, i) => i > s.selectedSlot && v === null);
      const nextSlot = nextEmpty !== -1
        ? nextEmpty
        : Math.min(s.selectedSlot + 1, CODE_LENGTH - 1);
      return { ...s, currentGuess: newGuess, selectedSlot: nextSlot };
    });
  }, [gameStatus]);

  const handleSubmit = useCallback(() => {
    if (gameStatus !== 'playing') return;
    if (currentGuess.some(c => c === null)) return;

    const filledGuess = currentGuess as string[];
    const feedback = evaluateGuess(secretCode, filledGuess);
    const newGuesses = [...guesses, { colors: filledGuess, feedback }];

    let newStatus: GameStatus = 'playing';
    if (feedback.blacks === CODE_LENGTH) {
      newStatus = 'won';
    } else if (newGuesses.length >= MAX_TURNS) {
      newStatus = 'lost';
    }

    setState(s => ({
      ...s,
      guesses: newGuesses,
      currentGuess: Array(CODE_LENGTH).fill(null),
      selectedSlot: 0,
      gameStatus: newStatus,
    }));
  }, [gameStatus, currentGuess, guesses, secretCode]);

  const handleClear = useCallback(() => {
    setState(s => ({
      ...s,
      currentGuess: Array(CODE_LENGTH).fill(null),
      selectedSlot: 0,
    }));
  }, []);

  const handleNewGame = useCallback(() => {
    setState(createInitialState());
  }, []);

  const isGuessComplete = currentGuess.every(c => c !== null);
  const turnsLeft = MAX_TURNS - guesses.length;

  const rows: RowState[] = [];
  for (let i = 0; i < MAX_TURNS; i++) {
    if (i < guesses.length) {
      rows.push({
        type: 'past',
        guess: guesses[i].colors,
        feedback: guesses[i].feedback,
        rowNumber: i + 1,
      });
    } else if (i === guesses.length && gameStatus === 'playing') {
      rows.push({ type: 'active', rowNumber: i + 1 });
    } else {
      rows.push({ type: 'empty', rowNumber: i + 1 });
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Mastermind</h1>
        <p className="subtitle">Break the secret code</p>
      </header>

      <div className="game-container">
        <div className="secret-row">
          <SecretCode code={secretCode} revealed={gameStatus !== 'playing'} />
        </div>

        {gameStatus !== 'playing' && (
          <div className={`result-banner ${gameStatus}`}>
            {gameStatus === 'won'
              ? `You cracked it in ${guesses.length} ${guesses.length === 1 ? 'guess' : 'guesses'}!`
              : 'Better luck next time!'}
          </div>
        )}

        <div className="board">
          {rows.map((row, i) => (
            <GuessRow
              key={i}
              rowNumber={row.rowNumber}
              guess={row.type === 'past' ? row.guess : undefined}
              feedback={row.type === 'past' ? row.feedback : undefined}
              isActive={row.type === 'active'}
              currentGuess={row.type === 'active' ? currentGuess : undefined}
              selectedSlot={row.type === 'active' ? selectedSlot : undefined}
              onSlotClick={row.type === 'active' ? handleSlotClick : undefined}
            />
          ))}
        </div>

        {gameStatus === 'playing' && (
          <div className="controls">
            <ColorPicker onColorSelect={handleColorSelect} />
            <div className="action-buttons">
              <button className="btn btn-secondary" onClick={handleClear}>
                Clear
              </button>
              <button
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={!isGuessComplete}
              >
                Submit
              </button>
            </div>
            <p className="turns-left">
              {turnsLeft} {turnsLeft === 1 ? 'guess' : 'guesses'} remaining
            </p>
          </div>
        )}

        {gameStatus !== 'playing' && (
          <div className="controls">
            <button className="btn btn-primary btn-large" onClick={handleNewGame}>
              New Game
            </button>
          </div>
        )}
      </div>

      <footer className="legend">
        <div className="legend-item">
          <span className="legend-peg black-peg" /> Right color, right spot
        </div>
        <div className="legend-item">
          <span className="legend-peg white-peg" /> Right color, wrong spot
        </div>
      </footer>
    </div>
  );
}
