import { useState } from "react";
import PlayerList from "./component/PlayerList";
import AuctionBoard from "./component/AuctionBoard";
import TeamRoster from "./component/TeamRoster";
import AddPlayer from "./component/AddPlayer";
import Timer from "./component/Timer";
import PlayerCard from "./component/PlayerCard";
import Slider from "./component/Slider";

import {
  initialTeams,
  marqueePlayers,
  bowler,
  batter,
  allRounders,
} from "./data";

const App = () => {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState(initialTeams);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [currentBid, setCurrentBid] = useState(0);
  const [currentTeam, setCurrentTeam] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [timerReset, setTimerReset] = useState(false);
  const [hasFirstBid, setHasFirstBid] = useState(false); // Track if the first bid has been made
  const [soldCategories, setSoldCategories] = useState({
    // Track sold categories
    marqueePlayers: false,
    allRounders: false,
    bowlers: false,
    batters: false,
  });

  const startAuction = () => {
    if (players.length === 0) return alert("No players left!");
    const randomIndex = Math.floor(Math.random() * players.length);
    const player = players[randomIndex];
    setPlayers(players.filter((_, i) => i !== randomIndex));
    setCurrentPlayer(player);
    setCurrentBid(player.basePrice); // Initialize the bid with the player's base price
    setCurrentTeam(null);
    setIsPaused(false);
    setTimerReset(!timerReset); // Reset timer
    setHasFirstBid(false); // Reset the first bid flag
  };

  const handleBid = (teamKey) => {
    if (!hasFirstBid) {
      // First bid sets the base price and the team
      setCurrentTeam(teamKey);
      setHasFirstBid(true);
      setTimerReset(!timerReset); // Reset the timer for the new bid
      setIsPaused(false); // Resume timer if paused
      return;
    }

    const newBid = currentBid + 0.25;
    if (teams[teamKey].budget >= newBid) {
      setCurrentBid(newBid);
      setCurrentTeam(teamKey);
      setTimerReset(!timerReset); // Reset timer when a new bid is placed
      setIsPaused(false); // Resume timer if it was paused
    } else {
      alert("Not enough budget!");
    }
  };

  const pauseTimer = () => setIsPaused((prev) => !prev);

  const sellPlayer = () => {
    if (!currentTeam) return alert("No bids placed!");
    const player = { ...currentPlayer, price: currentBid };
    setTeams({
      ...teams,
      [currentTeam]: {
        ...teams[currentTeam],
        budget: teams[currentTeam].budget - currentBid,
        roster: [...teams[currentTeam].roster, player],
      },
    });
    setCurrentPlayer(null);
    setCurrentBid(0);
    setCurrentTeam(null);
  };

  const handleCategoryClick = (categoryKey, categoryPlayers) => {
    if (soldCategories[categoryKey]) return; // Disable if category is sold
    setPlayers(categoryPlayers);
    setSoldCategories({ ...soldCategories, [categoryKey]: true }); // Mark category as sold
  };

  const deletePlayerFromAvailable = (playerId) => {
    setPlayers(players.filter((player) => player.id !== playerId));
  };

  const deletePlayerFromTeam = (teamKey, playerId) => {
    const player = teams[teamKey].roster.find((p) => p.id === playerId);
    if (player) {
      setTeams({
        ...teams,
        [teamKey]: {
          ...teams[teamKey],
          budget: teams[teamKey].budget + player.price, // Refund price
          roster: teams[teamKey].roster.filter((p) => p.id !== playerId), // Remove player
        },
      });
      setPlayers([...players, player]); // Add player back to available players
    }
  };

  return (
    <div className="w-full text-white bg-indigo-950 min-h-screen h-full justify-center">
      <div className="border-2 mb-4">
        <section className="w-full content-center text-center text-5xl font-bold p-2">
          <h1>Mega Auction</h1>
        </section>

        <div className="flex m-8 justify-center space-x-10">
          <button
            className="rounded-md bg-slate-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
            type="button"
            onClick={() =>
              handleCategoryClick("marqueePlayers", marqueePlayers)
            }
            disabled={soldCategories.marqueePlayers}
          >
            ️‍🔥 Players
          </button>
          <button
            className="rounded-md bg-slate-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
            type="button"
            onClick={() => handleCategoryClick("allRounders", allRounders)}
            disabled={soldCategories.allRounders}
          >
            🏏 All Rounders
          </button>
          <button
            className="rounded-md bg-slate-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
            type="button"
            onClick={() => handleCategoryClick("bowlers", bowler)}
            disabled={soldCategories.bowlers}
          >
            Bowlers
          </button>
          <button
            className="rounded-md bg-slate-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
            type="button"
            onClick={() => handleCategoryClick("batters", batter)}
            disabled={soldCategories.batters}
          >
            ️Batter
          </button>
        </div>
        <div className="py-4 content-center justify-center text-center">
          <AddPlayer
            onAddPlayer={(player) => setPlayers([...players, player])}
          />
        </div>
      </div>
      <h2 className="text-xl m-4">{`Upcoming Players`}</h2>
      <div className="text-center bg-lime-500 py-3">
        <Slider
          width={120}
          height={140}
          quantity={players.length}
          players={players}
        />
      </div>
      <div className="">
        <div className=" bg-pink-800">
          {/*<PlayerList
            players={players}
            onDeletePlayer={deletePlayerFromAvailable} // Pass delete handler
          />*/}
          {currentPlayer && (
            <div className="">
              <PlayerCard
                title={currentPlayer.name}
                category={currentPlayer.category}
                price={currentPlayer.basePrice}
                imageSrc={currentPlayer.imageSrc}
              />
              <div className="w-full content-center align-middle justify-center text-center">
                <AuctionBoard
                  player={currentPlayer}
                  bid={currentBid}
                  team={currentTeam ? teams[currentTeam].name : "None"}
                  onBid={handleBid}
                  onEndAuction={sellPlayer}
                  onPauseTimer={pauseTimer}
                  onResetTimer={() => setTimerReset(!timerReset)}
                  onSellPlayer={sellPlayer}
                  disabledTeam={currentTeam}
                />
                <Timer
                  duration={90}
                  onTimeout={sellPlayer}
                  isPaused={isPaused}
                  onReset={timerReset}
                />
              </div>
            </div>
          )}
          <button
            className="rounded-md bg-slate-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
            type="button"
            onClick={startAuction}
          >
            Draw Player
          </button>
        </div>
        <TeamRoster
          teams={teams}
          onDeletePlayer={deletePlayerFromTeam} // Pass delete handler for teams
        />
      </div>
    </div>
  );
};

export default App;
