import type { ReactElement } from 'react';

function lcg(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

const COUNT = 20;

const rand = lcg(99);
const METEORS = Array.from({ length: COUNT }, () => {
  const duration = 6 + rand() * 10; // 6–16s (slow)
  return {
    // Full-width distribution — slight overflow on both sides
    left:     -20 + rand() * 120,  // -20% to 100%
    // Spread vertically across the full viewport height
    top:      -10 + rand() * 110,  // -10vh to 100vh
    delay:    -(rand() * duration),
    duration,
  };
});

export const CometBackground = (): ReactElement => {
  return (
    <div className="meteor-container" aria-hidden="true">
      {METEORS.map((m, i) => (
        <span
          key={i}
          className="meteor"
          style={{
            top:               `0`,
            left:              `${m.left}%`,
            animationDelay:    `${m.delay}s`,
            animationDuration: `${m.duration}s`,
          }}
        />
      ))}
    </div>
  );
};
