import React from "react";
import "../component/Slider.css";

const Slider = ({ width, height, quantity, reverse, players }) => {
  return (
    <div
      className={`slider ${reverse ? "reverse" : ""}`}
      style={{
        "--width": `${width}px`,
        "--height": `${height}px`,
        "--quantity": quantity,
      }}
    >
      <div className="list">
        {players.map((src, index) => (
          <div className="item" key={index} style={{ "--position": index + 1 }}>
            <img
              className="w-[50px] h-[85px]"
              src={src.imageSrc}
              alt={`Slider ${index + 1}`}
            />
            <p className="text-white">{src.name}</p>
            <p className="text-white">{src.basePrice} Cr</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
