import { useState } from "react";
import { fighters } from "./fighters";

import "./fightSimulator";

function App() {
  const [fighter1, fighter2] = fighters;
  const [currentRound, setCurrentRound] = useState(1);

  return (
    <div className="font-koulen bg-gray-100 min-h-screen flex flex-col items-center justify-start py-4 px-8">
      <h1 className="text-4xl font-bold text-center text-red-500">
        Fight Night
      </h1>
      <header className="w-full text-center">
        <h3>
          {fighter1.name} vs {fighter2.name}
        </h3>
        <div className="bg-red-700 p-2">5:00 Round {currentRound}</div>
      </header>
      <div className="grid grid-cols-3 gap-2 items-stretch w-full p-4">
        <div className="flex flex-col items-center justify-start">
          <h2>{fighter1.name}</h2>
          <h3>{fighter1.nationality}</h3>
        </div>
        <div className="border-red-900 border p-4 h-80 max-h-96 overflow-y-auto">
          <h2>Events (Round {currentRound})</h2>
          <ul className="font-sans">
            <li>Round 1</li>
            <li>Round 2</li>
            <li>Round 3</li>
            <li>Round 4</li>
            <li>Round 5</li>
            <li>Round 1</li>
            <li>Round 2</li>
            <li>Round 3</li>
            <li>Round 4</li>
            <li>Round 5</li>
            <li>Round 1</li>
            <li>Round 2</li>
            <li>Round 3</li>
            <li>Round 4</li>
            <li>Round 5</li>
            <li>Round 1</li>
            <li>Round 2</li>
            <li>Round 3</li>
            <li>Round 4</li>
            <li>Round 5</li>
          </ul>
        </div>
        <div className="flex flex-col items-center justify-start">
          <h2>{fighter2.name}</h2>
          <h3>{fighter2.nationality}</h3>
        </div>
      </div>
    </div>
  );
}

export default App;
