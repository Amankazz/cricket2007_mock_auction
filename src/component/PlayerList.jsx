import React from "react";

const PlayerList = ({ players, onDeletePlayer }) => {
  return (
    <div>
      <ul>
        <div className="flex">
          {players.map((player) => (
            <li key={player.id}>
              <div>
                {/*<img
                  src={player.imageSrc}
                  alt={player.name}
                  style={{ width: "50px", height: "50px" }}
                />*/}
                <span>
                  {player.name} - ₹{player.basePrice} Cr
                </span>
                <button
                  className="rounded-xl bg-red-400 p-3 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-red-700 hover:bg-red-700 "
                  type="button"
                  onClick={() => onDeletePlayer(player.id)}
                >
                  X
                </button>
              </div>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default PlayerList;
