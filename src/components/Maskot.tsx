import { useId } from "react";

export function Maskot({ className = "" }: { className?: string }) {
  const id = useId();
  return <svg className={className} viewBox="0 0 320 235" aria-hidden="true">
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="0.6" y2="1"><stop stopColor="#fff19a"/><stop offset=".54" stopColor="#ffdb5c"/><stop offset="1" stopColor="#ffb637"/></linearGradient>
    </defs>
    <ellipse cx="169" cy="202" rx="82" ry="10" fill="#6b44b1" opacity=".15"/>
    <path d="M125 169q-2 27-17 20m94-21q10 23 22 15" fill="none" stroke="#7140a9" strokeWidth="6" strokeLinecap="round"/>
    <path d="M91 128q-20 3-31-12m167 17q27-3 33-20" fill="none" stroke="#7140a9" strokeWidth="6" strokeLinecap="round"/>
    <g transform="rotate(-8 160 108)">
      <path d="M155 29q7-13 14 0l22 43 48 8q15 2 5 13l-35 34 6 48q2 15-12 9l-43-23-44 22q-14 7-12-8l7-48-34-34q-10-11 5-13l48-8z" fill="#ee9e34" stroke="#8952b2" strokeWidth="5" transform="translate(0 5)"/>
      <path d="M155 29q7-13 14 0l22 43 48 8q15 2 5 13l-35 34 6 48q2 15-12 9l-43-23-44 22q-14 7-12-8l7-48-34-34q-10-11 5-13l48-8z" fill={`url(#${id})`} stroke="#8952b2" strokeWidth="4"/>
      <path d="m139 69 17-35m-65 54 25-4" fill="none" stroke="#fff6b7" strokeWidth="5" strokeLinecap="round"/>
      <ellipse cx="137" cy="105" rx="6" ry="9" fill="#493165"/><ellipse cx="183" cy="105" rx="6" ry="9" fill="#493165"/>
      <circle cx="139" cy="102" r="2" fill="white"/><circle cx="185" cy="102" r="2" fill="white"/>
      <path d="M148 116q12 4 24 0-2 16-12 16t-12-16" fill="#693853"/><path d="M154 130q6-7 12 0" fill="#ff82a0"/>
      <ellipse cx="123" cy="118" rx="10" ry="6" fill="#ff9e80"/><ellipse cx="197" cy="118" rx="10" ry="6" fill="#ff9e80"/>
    </g>
    <path d="M57 48q3 15 16 17-13 3-16 16-3-13-16-16 13-2 16-17" fill="#fce28d"/>
    <path d="M251 32q3 15 16 17-13 3-16 16-3-13-16-16 13-2 16-17" fill="#fff1aa"/>
    <path d="M278 141q2 9 10 10-8 2-10 10-2-8-10-10 8-1 10-10" fill="#f9c4e9"/>
    <circle cx="75" cy="157" r="5" fill="#f8c8ef"/><circle cx="274" cy="82" r="4" fill="#fff5c5"/><circle cx="113" cy="42" r="4" fill="#f6cffa"/>
  </svg>;
}
