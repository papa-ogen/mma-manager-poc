import { useEffect, useState } from "react";
import { fighters as fightersData } from "./fighters";
import { Fighter, IEvent } from "./type";
import { useImmer } from "use-immer";

const EventRow = ({ event }: { event: IEvent }) => {
  let color = "text-black";
  switch (event.type) {
    case "miss":
      color = "text-red-500";
      break;
    case "announcement":
      color = "text-yellow-500";
      break;
    case "throw":
      color = "text-blue-500";
      break;
    case "land":
      color = "text-green-500";
      break;
    case "disabled":
      color = "text-gray-500";
      break;
  }
  return (
    <div className={`flex flex-row items-center justify-between ${color}`}>
      <div>{event.message}</div>
    </div>
  );
};

const EventList = ({ events }: { events: IEvent[] }) => {
  return (
    <div>
      {events.map((event, index) => (
        <EventRow key={index} event={event} />
      ))}
    </div>
  );
};

function App() {
  const [fighters, setFighters] = useImmer<Fighter[]>(fightersData);
  const [currentRound, setCurrentRound] = useState(1);
  const [events, setEvents] = useImmer<IEvent[]>([]);

  useEffect(() => {
    function updateFighterStamina(defender: Fighter, damage: number = 10) {
      setFighters((draft) => {
        // Find the correct fighter by ID
        const fighterToUpdate = draft.find(
          (fighter) => fighter.id === defender.id
        );
        if (fighterToUpdate) {
          // Update the fighter's stamina
          fighterToUpdate.stats.stamina -= damage;
        }
      });
    }

    // Simulate a round of fighting
    const simulateFightRound = (fighterA: Fighter, fighterB: Fighter) => {
      // Determine which fighter is taking the action (50% chance for either fighter)
      const attacker = Math.random() > 0.5 ? fighterA : fighterB;
      const defender = attacker === fighterA ? fighterB : fighterA;

      // Simulate an action (strike, kick, takedown, etc.)
      const actions = ["strike", "kick", "takedown", "clinch"];
      const action = actions[Math.floor(Math.random() * actions.length)];

      switch (action) {
        case "strike":
          setEvents((draft) => {
            draft.unshift({
              time: `5:00`,
              type: "throw",
              message: `${attacker.name} throws a punch!`,
            });
          });

          if (Math.random() < 0.7) {
            setEvents((draft) => {
              draft.unshift({
                time: `5:00`,
                type: "land",
                message: `${attacker.name} lands the strike!`,
              });
            });

            updateFighterStamina(defender, 5);
          } else {
            setEvents((draft) => {
              draft.unshift({
                time: `5:00`,
                type: "miss",
                message: `${attacker.name} misses the strike!`,
              });
            });
          }
          break;
        case "kick":
          setEvents((draft) => {
            draft.unshift({
              time: `5:00`,
              type: "throw",
              message: `${attacker.name} throws a kick!`,
            });
          });

          if (Math.random() < 0.6) {
            setEvents((draft) => {
              draft.unshift({
                time: `5:00`,
                type: "land",
                message: `${attacker.name} lands the kick!`,
              });
            });

            updateFighterStamina(defender);
          } else {
            setEvents((draft) => {
              draft.unshift({
                time: `5:00`,
                type: "miss",
                message: `${attacker.name} misses the kick!`,
              });
            });
          }
          break;
        case "takedown":
          setEvents((draft) => {
            draft.unshift({
              time: `5:00`,
              type: "announcement",
              message: `${attacker.name} attempts a takedown!`,
            });
          });

          if (Math.random() < 0.5) {
            setEvents((draft) => {
              draft.unshift({
                time: `5:00`,
                type: "land",
                message: `${attacker.name} successfully takes down ${defender.name}!`,
              });
            });
            updateFighterStamina(defender, 15);
          } else {
            setEvents((draft) => {
              draft.unshift({
                time: `5:00`,
                type: "miss",
                message: `${attacker.name} fails the takedown!`,
              });
            });
          }
          break;
        case "clinch":
          setEvents((draft) => {
            draft.unshift({
              time: `5:00`,
              type: "announcement",
              message: `${attacker.name} pulls ${defender.name} into a clinch!`,
            });
          });

          if (Math.random() < 0.8) {
            setEvents((draft) => {
              draft.unshift({
                time: `5:00`,
                type: "land",
                message: `${attacker.name} controls the clinch!`,
              });
            });

            updateFighterStamina(defender, 5);
          } else {
            setEvents((draft) => {
              draft.unshift({
                time: `5:00`,
                type: "miss",
                message: `${attacker.name} is unable to control the clinch!`,
              });
            });
          }
          break;
        default:
          console.log("Unknown action!");
          break;
      }
    };

    const startFightSimulation = () => {
      const interval = setInterval(() => {
        simulateFightRound(fighters[0], fighters[1]);

        setCurrentRound(currentRound + 1);

        // End the fight if either fighter's stamina reaches 0
        if (fighters[0].stats.stamina <= 0 || fighters[1].stats.stamina <= 0) {
          setEvents((draft) => {
            draft.unshift({
              time: `5:00`,
              type: "announcement",
              message: `Fight over!`,
            });
          });
          clearInterval(interval);
        }
      }, 2000); // Fight rounds run every 2 seconds
    };

    setEvents((draft) => {
      draft.unshift({
        time: `5:00`,
        type: "announcement",
        message: `Round is starting... Round ${currentRound}...`,
      });
    });

    startFightSimulation();
  }, [currentRound, setEvents, fighters, setFighters]);

  return (
    <div className="font-koulen bg-gray-100 min-h-screen flex flex-col items-center justify-start py-4 px-8">
      <h1 className="text-4xl font-bold text-center text-red-500">
        Fight Night
      </h1>
      <header className="w-full text-center">
        <h3>
          {fighters[0].name} vs {fighters[1].name}
        </h3>
        <div className="bg-red-700 p-2">5:00 Round {currentRound}</div>
      </header>
      <div className="grid grid-cols-3 gap-2 items-stretch w-full p-4">
        <div className="flex flex-col items-center justify-start">
          <h2>{fighters[0].name}</h2>
          <h3>{fighters[0].nationality}</h3>
          <h3>Stamina: {fighters[0].stats.stamina}</h3>
        </div>
        <div className="border-red-900 border p-4 h-80 max-h-96 overflow-y-auto">
          <h2>Events (Round {currentRound})</h2>
          <EventList events={events} />
        </div>
        <div className="flex flex-col items-center justify-start">
          <h2>{fighters[1].name}</h2>
          <h3>{fighters[1].nationality}</h3>
          <h3>Stamina: {fighters[1].stats.stamina}</h3>
        </div>
      </div>
    </div>
  );
}

export default App;
