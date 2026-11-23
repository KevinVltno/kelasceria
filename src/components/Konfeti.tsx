export function Konfeti() {
  return <div className="confetti" aria-hidden="true">{Array.from({ length: 18 }, (_, i) =>
    <i key={i} style={{ "--x": (i % 2 ? 1 : -1) * (38 + i * 11) + "px", "--y": (i % 3 ? 1 : -1) * (27 + i * 7) + "px", backgroundColor: ["#f5a4dd","#ffd352","#99dfba","#a88aff","#75c9fa"][i % 5] } as React.CSSProperties}/>)}</div>;
}
