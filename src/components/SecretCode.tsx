import Peg from './Peg';

interface SecretCodeProps {
  code: string[];
  revealed: boolean;
}

export default function SecretCode({ code, revealed }: SecretCodeProps) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '12px 20px',
      background: 'rgba(0,0,0,0.25)',
      borderRadius: 14,
      border: '2px solid rgba(255,255,255,0.15)',
    }}>
      <span style={{
        color: 'rgba(255,255,255,0.6)',
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: 1,
        textTransform: 'uppercase',
        flexShrink: 0,
      }}>
        Code
      </span>
      <div style={{ display: 'flex', gap: 8 }}>
        {code.map((colorId, i) => (
          <Peg key={i} colorId={revealed ? colorId : null} />
        ))}
      </div>
    </div>
  );
}
