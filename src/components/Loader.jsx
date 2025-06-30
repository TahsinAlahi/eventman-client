import React from "react";

export default function Loader() {
  const squares = [
    { id: "sq1", mt: "-25px", ml: "-25px", delay: "0s" },
    { id: "sq2", mt: "-25px", ml: "0px", delay: "75ms" },
    { id: "sq3", mt: "-25px", ml: "15px", delay: "150ms" },
    { id: "sq4", mt: "0px", ml: "-25px", delay: "225ms" },
    { id: "sq5", mt: "0px", ml: "0px", delay: "300ms" },
    { id: "sq6", mt: "0px", ml: "15px", delay: "375ms" },
    { id: "sq7", mt: "15px", ml: "-25px", delay: "450ms" },
    { id: "sq8", mt: "15px", ml: "0px", delay: "525ms" },
    { id: "sq9", mt: "15px", ml: "15px", delay: "600ms" },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative w-20 h-20">
        {squares.map((sq) => (
          <div
            key={sq.id}
            className="absolute w-2.5 h-2.5 bg-gray-300 top-1/2 left-1/2 loader-square"
            style={{
              marginTop: sq.mt,
              marginLeft: sq.ml,
              animationDelay: sq.delay,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
