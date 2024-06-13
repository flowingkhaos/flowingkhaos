import { StatProps } from "@/lib/gql/queries/pages/home";
import React from "react";
import { FlipWords } from "../aceternity/flip-words";

const StatBar: React.FC<StatProps> = async ({ ...stat }) => {
  //console.log({ ...stat });
  const words = [
    `${stat.value[0]} ${stat.description[0]} (${stat.analytic[0]})`,
    `${stat.value[1]} ${stat.description[1]} (${stat.analytic[1]})`,
    `${stat.value[2]} ${stat.description[2]} (${stat.analytic[2]})`,
  ];
  return (
    <>
      <h1 className="text-2xl leading-7 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 text-content font-montserrat font-black">
        {stat.title}
      </h1>
      <p className="mb-3 leading-7 flex-grow text-content font-montserrat py-2">
        {stat.subtitle}
      </p>
      <br />
      <FlipWords words={words} />
    </>
  );
};

export default StatBar;
