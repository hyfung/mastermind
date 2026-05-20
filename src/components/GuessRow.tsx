import Peg from './Peg';
import FeedbackPegs from './FeedbackPegs';
import { CODE_LENGTH, type Feedback } from '../gameLogic';

interface GuessRowProps {
  rowNumber: number;
  guess?: string[];
  feedback?: Feedback;
  isActive?: boolean;
  currentGuess?: (string | null)[] | null;
  selectedSlot?: number | null;
  onSlotClick?: (slotIndex: number) => void;
}

export default function GuessRow({
  guess,
  feedback,
  isActive = false,
  currentGuess = null,
  selectedSlot = null,
  onSlotClick,
  rowNumber,
}: GuessRowProps) {
  const slots: (string | null)[] = isActive
    ? (currentGuess ?? Array(CODE_LENGTH).fill(null))
    : (guess ?? Array(CODE_LENGTH).fill(null));

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '8px 12px',
      borderRadius: 12,
      background: isActive
        ? 'rgba(255,255,255,0.08)'
        : 'rgba(255,255,255,0.03)',
      border: isActive
        ? '1px solid rgba(255,255,255,0.2)'
        : '1px solid transparent',
      transition: 'background 0.2s',
    }}>
      <span style={{
        width: 22,
        textAlign: 'right',
        color: 'rgba(255,255,255,0.35)',
        fontSize: 13,
        fontWeight: 500,
        flexShrink: 0,
      }}>
        {rowNumber}
      </span>

      <div style={{ display: 'flex', gap: 8, flex: 1, justifyContent: 'center' }}>
        {slots.map((colorId, i) => (
          <Peg
            key={i}
            colorId={colorId}
            selected={isActive && selectedSlot === i}
            onClick={isActive && onSlotClick ? () => onSlotClick(i) : undefined}
          />
        ))}
      </div>

      <FeedbackPegs
        blacks={feedback?.blacks ?? 0}
        whites={feedback?.whites ?? 0}
        empty={!feedback}
      />
    </div>
  );
}
