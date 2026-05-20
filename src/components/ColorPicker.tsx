import { COLORS } from '../gameLogic';

interface ColorPickerProps {
  onColorSelect: (colorId: string) => void;
  disabled?: boolean;
}

export default function ColorPicker({ onColorSelect, disabled }: ColorPickerProps) {
  return (
    <div style={{
      display: 'flex',
      gap: 10,
      justifyContent: 'center',
      flexWrap: 'wrap',
      padding: '16px 20px',
      background: 'rgba(0,0,0,0.2)',
      borderRadius: 16,
      border: '1px solid rgba(255,255,255,0.1)',
    }}>
      {COLORS.map(color => (
        <button
          key={color.id}
          onClick={() => !disabled && onColorSelect(color.id)}
          disabled={disabled}
          title={color.label}
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            background: color.hex,
            border: '2px solid rgba(255,255,255,0.2)',
            cursor: disabled ? 'not-allowed' : 'pointer',
            boxShadow: `inset 0 3px 8px rgba(255,255,255,0.3), 0 4px 12px rgba(0,0,0,0.3)`,
            transition: 'transform 0.12s, box-shadow 0.12s',
            opacity: disabled ? 0.4 : 1,
          }}
          className="color-btn"
        />
      ))}
    </div>
  );
}
