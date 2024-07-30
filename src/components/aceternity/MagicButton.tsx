import React from "react";
import { Button } from "../ui/button";

/**
 *  UI: border magic from tailwind css btns
 *  Link: https://ui.aceternity.com/components/tailwindcss-buttons
 *
 *  change border radius to rounded-lg
 *  add margin of md:mt-10
 *  remove focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50
 */
const MagicButton = ({
  title,
  icon,
  position,
  handleClick,
  otherClasses,
}: {
  title: string;
  icon: React.ReactNode;
  position: string;
  handleClick?: () => void;
  otherClasses?: string;
}) => {
  return (
    <Button
      variant="default"
      size="lg"
      className={`inline-flex cursor-pointer items-center justify-center backdrop-blur-3xl gap-2 ${otherClasses}`}
      onClick={handleClick}
    >
      {position === "left" && icon}
      {title}
      {position === "right" && icon}
    </Button>
  );
};

export default MagicButton;
