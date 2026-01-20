type Props = {
  text: string;
  query: string;
};

export function HighlightText({ text, query }: Props) {
  const q = query.trim();
  if (!q) return <span className="text-white/70">{text}</span>;

  const lowerText = text.toLowerCase();
  const lowerQ = q.toLowerCase();
  const idx = lowerText.indexOf(lowerQ);

  // 매칭 없으면 전부 흐리게
  if (idx === -1) return <span className="text-white/50">{text}</span>;

  const before = text.slice(0, idx);
  const match = text.slice(idx, idx + q.length);
  const after = text.slice(idx + q.length);

  return (
    <span>
      <span className="text-white/50">{before}</span>
      <span className="text-white font-semibold">{match}</span>
      <span className="text-white/50">{after}</span>
    </span>
  );
}
