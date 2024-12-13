const AuctionBoard = ({
  player,
  bid,
  team,
  onBid,
  onEndAuction,
  onPauseTimer,
  onResetTimer,
  onSellPlayer,
  disabledTeam,
}) => (
  <div>
    {/*<p>Name: {player.name}</p>
    <p>Category: {player.category}</p>
    <p>Base Price: ₹{player.basePrice} Cr</p>*/}
    <p className="text-4xl pb-10">
      Current Bid: ₹{bid} Cr by {team || "None"}
    </p>
    <div className="flex justify-evenly">
      <button
        className="rounded-md bg-blue-500 py-5 text-xl px-4 border border-transparent text-center text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
        type="button"
        onClick={() => onBid("team1")}
        disabled={disabledTeam === "team1"} // Disable button for Team 1 if it has the highest bid
      >
        Datiya Bid +₹0.25 Cr
      </button>
      <button
        className="rounded-md bg-red-500 py-5 text-xl px-4 border border-transparent text-center text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
        type="button"
        onClick={() => onBid("team2")}
        disabled={disabledTeam === "team2"} // Disable button for Team 2 if it has the highest bid
      >
        Nadan Bid +₹0.25 Cr
      </button>
    </div>
    <button
      class="rounded-md bg-yellow-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
      type="button"
      onClick={onPauseTimer}
    >
      Pause Timer
    </button>
    {/*<button
      class="rounded-md bg-slate-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
      type="button"
      onClick={onResetTimer}
    >
      Reset Timer
    </button>*/}
    <button
      class="rounded-md bg-green-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
      type="button"
      onClick={onSellPlayer}
    >
      Sold
    </button>
  </div>
);

export default AuctionBoard;
