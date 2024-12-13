import React from "react";

const TeamRoster = ({ teams, onDeletePlayer }) => {
  return (
    <div className="flex text-center rounded-xl justify-evenly w-screen">
      {Object.keys(teams).map((teamKey) => (
        <div className="p-5 bg-green-400 rounded-xl" key={teamKey}>
          <h3 className="text-xl">{teams[teamKey].name}</h3>
          <p className="text-3xl p-10">Purse: {teams[teamKey].budget} Cr</p>
          <ul>
            {teams[teamKey].roster.map((player) => (
              <li key={player.id}>
                <div className="flex bg-slate-600 justify-between rounded-2xl mb-2">
                  <img
                    className="rounded-2xl"
                    src={player.imageSrc}
                    alt={player.name}
                    style={{ width: "50px", height: "50px" }}
                  />
                  <div className="text-lg content-center">
                    <span>{player.name}</span>
                    <span className="text-green-500">
                      {" "}
                      - ₹{player.price} Cr
                    </span>
                  </div>
                  <button
                    class="rounded-xl bg-red-400 p-3 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-red-700 hover:bg-red-700 "
                    type="button"
                    onClick={() => onDeletePlayer(teamKey, player.id)}
                  >
                    X
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TeamRoster;
