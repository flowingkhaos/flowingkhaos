import React from "react";
import DecryptLoader from "@/components/loaders/DecryptLoader";

const loading = () => {
  return (
    <div className="flex justify-center items-center h-screen px-4">
      <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-12">
        <DecryptLoader />
      </div>
    </div>
  );
};

export default loading;
