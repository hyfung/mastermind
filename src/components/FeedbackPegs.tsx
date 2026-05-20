interface FeedbackPegsProps {
  blacks?: number;
  whites?: number;
  empty?: boolean;
}

export default function FeedbackPegs({ blacks = 0, whites = 0, empty = false }: FeedbackPegsProps) {
  const pegs: ('black' | 'white' | 'empty')[] = [];
  for (let i = 0; i < 4; i++) {
    if (i < blacks) pegs.push('black');
    else if (i < blacks + whites) pegs.push('white');
    else pegs.push('empty');
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 4,
      width: 46,
      height: 46,
      padding: 4,
      background: 'rgba(0,0,0,0.15)',
      borderRadius: 8,
      flexShrink: 0,
    }}>
      {pegs.map((type, i) => (
        <div
          key={i}
          style={{
            borderRadius: '50%',
            background:
              empty ? 'transparent' :
              type === 'black' ? '#1a1a1a' :
              type === 'white' ? '#f0f0f0' :
              'rgba(255,255,255,0.1)',
            border:
              empty ? '1px dashed rgba(255,255,255,0.15)' :
              type === 'empty' ? '1px solid rgba(255,255,255,0.1)' :
              type === 'black' ? '1px solid rgba(255,255,255,0.2)' :
              '1px solid rgba(0,0,0,0.2)',
            boxShadow: !empty && type !== 'empty'
              ? 'inset 0 1px 3px rgba(255,255,255,0.2)'
              : 'none',
          }}
        />
      ))}
    </div>
  );
}
