import React from "react";

const PlayerCard = ({
  title,
  category,
  price,
  imageSrc = "https://static.vecteezy.com/system/resources/thumbnails/048/216/761/small/modern-male-avatar-with-black-hair-and-hoodie-illustration-free-png.png",
}) => {
  return (
    <div className="flex-shrink-0 m-6 relative overflow-hidden bg-orange-500 rounded-lg max-w-xs shadow-lg group">
      <div className="relative pt-10 px-10 flex items-center justify-center group-hover:scale-110 transition-transform">
        <img className="relative w-40" src={imageSrc} alt={title} />
      </div>
      <div className="relative text-white px-6 pb-6 mt-6">
        <span className="block opacity-75 -mb-1">{category}</span>
        <div className="flex justify-between">
          <span className="font-semibold text-xl">{title}</span>
          <span className="bg-green-600 rounded-full text-white-500 text-lg font-bold px-3 py-2 leading-none flex items-center">
            ₹ {price} Cr
          </span>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
