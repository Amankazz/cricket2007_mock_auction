import { useState } from "react";

const AddPlayer = ({ onAddPlayer }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Bowler");
  const [basePrice, setBasePrice] = useState(2);
  const [pimage, setPimage] = useState(
    "https://static.vecteezy.com/system/resources/thumbnails/048/216/761/small/modern-male-avatar-with-black-hair-and-hoodie-illustration-free-png.png"
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlayer({ name, category, basePrice });
    setName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Player</h2>
      <input
        type="text"
        placeholder="Player Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Bowler">Bowler</option>
        <option value="Batter">Batter</option>
        <option value="All Rounder">All Rounder</option>
      </select>
      <input
        type="number"
        placeholder="Base Price (Cr)"
        value={basePrice}
        onChange={(e) => setBasePrice(Number(e.target.value))}
        required
      />
      <button type="submit">Add Player</button>
    </form>
  );
};

export default AddPlayer;
