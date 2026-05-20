import { COLORS } from '../gameLogic';

interface PegProps {
  colorId?: string | null;
  size?: 'large' | 'small';
  selected?: boolean;
  onClick?: () => void;
}

export default function Peg({ colorId, size = 'large', selected = false, onClick }: PegProps) {
  const color = COLORS.find(c => c.id === colorId);
  const hex = color ? color.hex : null;

  const sizeMap = {
    large: { width: 44, height: 44, borderRadius: 22 },
    small: { width: 18, height: 18, borderRadius: 9 },
  };

  const dims = sizeMap[size];

  return (
    <div
      onClick={onClick}
      style={{
        ...dims,
        background: hex || 'transparent',
        border: selected
          ? '3px solid #fff'
          : hex
          ? '2px solid rgba(0,0,0,0.25)'
          : '2px dashed rgba(255,255,255,0.3)',
        boxShadow: hex
          ? selected
            ? `0 0 0 2px #fff, 0 4px 12px rgba(0,0,0,0.4)`
            : `inset 0 3px 6px rgba(255,255,255,0.35), 0 3px 8px rgba(0,0,0,0.3)`
          : 'none',
        cursor: onClick ? 'pointer' : 'default',
        flexShrink: 0,
        transition: 'transform 0.1s, box-shadow 0.1s',
      }}
      className={onClick ? 'peg-interactive' : ''}
      title={color ? color.label : ''}
    />
  );
}
