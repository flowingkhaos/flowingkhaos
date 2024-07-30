"use client";
import { TypewriterEffectSmooth } from "../aceternity/Typewriter-effect";
export function TypewriterHero({
  title,
  name,
  description,
  className,
  cursorClassName,
}: {
  title?: string;
  name: string;
  description?: string;
  className?: string;
  cursorClassName?: string;
}) {
  const words = name.split(" ").map((word, index, array) => ({
    text: word,
    className: index === array.length - 1 ? "text-secondary" : undefined,
  }));
  return (
    <div className="flex flex-col items-center justify-center">
      <TypewriterEffectSmooth words={words} className="" />
    </div>
  );
}
