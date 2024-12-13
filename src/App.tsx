import { useEffect, useState, useRef } from "react";
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
  const [actionRound, setActionRound] = useState(1);
  const [events, setEvents] = useImmer<IEvent[]>([]);
  const [round, setRound] = useState(1);
  const [roundTime, setRoundTime] = useState(300); // 5 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const eventsContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (eventsContainerRef.current) {
      eventsContainerRef.current.scrollTop =
        eventsContainerRef.current.scrollHeight;
    }
  }, [events]); // Trigger when events update

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isTimerRunning) {
      timer = setInterval(() => {
        setRoundTime((prevTime) => {
          if (prevTime <= 1) {
            // End of the round
            clearInterval(timer!);
            setIsTimerRunning(false);
            setRound((prevRound) => prevRound + 1); // Increment round
            return 300; // Reset timer to 5 minutes
          }
          return prevTime - 1; // Decrement time
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer); // Cleanup interval on unmount or dependency change
    };
  }, [isTimerRunning]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Refs to hold the latest values
  const fightersRef = useRef(fighters);
  const currentRoundRef = useRef(actionRound);

  // Update refs whenever state changes
  useEffect(() => {
    fightersRef.current = fighters;
  }, [fighters]);

  useEffect(() => {
    currentRoundRef.current = actionRound;
  }, [actionRound]);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    let fightInterval: NodeJS.Timeout | null = null;

    function updateFighterStamina(defender: Fighter, damage: number = 10) {
      setFighters((draft) => {
        const fighterToUpdate = draft.find(
          (fighter) => fighter.id === defender.id
        );
        if (fighterToUpdate) {
          fighterToUpdate.stats.stamina -= damage;
        }
      });
    }

    const simulateFightRound = (fighterA: Fighter, fighterB: Fighter) => {
      const attacker = Math.random() > 0.5 ? fighterA : fighterB;
      const defender = attacker === fighterA ? fighterB : fighterA;

      const actions = ["strike", "kick", "takedown", "clinch"];
      const action = actions[Math.floor(Math.random() * actions.length)];

      switch (action) {
        case "strike":
          setEvents((draft) => {
            draft.push({
              time: formatTime(roundTime),
              type: "throw",
              message: `${attacker.name} throws a punch!`,
            });
          });
          if (Math.random() < 0.7) {
            setEvents((draft) => {
              draft.push({
                time: formatTime(roundTime),
                type: "land",
                message: `${attacker.name} lands the strike!`,
              });
            });
            updateFighterStamina(defender, 5);
          } else {
            setEvents((draft) => {
              draft.push({
                time: formatTime(roundTime),
                type: "miss",
                message: `${attacker.name} misses the strike!`,
              });
            });
          }
          break;
        case "kick":
          setEvents((draft) => {
            draft.push({
              time: formatTime(roundTime),
              type: "throw",
              message: `${attacker.name} throws a kick!`,
            });
          });
          if (Math.random() < 0.6) {
            setEvents((draft) => {
              draft.push({
                time: formatTime(roundTime),
                type: "land",
                message: `${attacker.name} lands the kick!`,
              });
            });
            updateFighterStamina(defender, 10);
          } else {
            setEvents((draft) => {
              draft.push({
                time: formatTime(roundTime),
                type: "miss",
                message: `${attacker.name} misses the kick!`,
              });
            });
          }
          break;
        case "takedown":
          setEvents((draft) => {
            draft.push({
              time: formatTime(roundTime),
              type: "throw",
              message: `${attacker.name} attempts a takedown!`,
            });
          });

          if (Math.random() < 0.5) {
            setEvents((draft) => {
              draft.push({
                time: formatTime(roundTime),
                type: "land",
                message: `${attacker.name} successfully takes down ${defender.name}!`,
              });
            });
            updateFighterStamina(defender, 15);
          } else {
            setEvents((draft) => {
              draft.push({
                time: formatTime(roundTime),
                type: "miss",
                message: `${attacker.name} fails the takedown!`,
              });
            });
          }
          break;
        case "clinch":
          setEvents((draft) => {
            draft.push({
              time: formatTime(roundTime),
              type: "throw",
              message: `${attacker.name} pulls ${defender.name} into a clinch!`,
            });
          });
          if (Math.random() < 0.8) {
            setEvents((draft) => {
              draft.push({
                time: formatTime(roundTime),
                type: "land",
                message: `${attacker.name} controls the clinch!`,
              });
            });
            updateFighterStamina(defender, 5);
          } else {
            setEvents((draft) => {
              draft.push({
                time: formatTime(roundTime),
                type: "miss",
                message: `${attacker.name} is unable to control the clinch!`,
              });
            });
          }
          break;
        default:
          setEvents((draft) => {
            draft.push({
              time: formatTime(roundTime),
              type: "disabled",
              message: `...`,
            });
          });
          break;
      }
    };

    const startFightSimulation = () => {
      fightInterval = setInterval(() => {
        const [fighterA, fighterB] = fightersRef.current;
        simulateFightRound(fighterA, fighterB);

        setActionRound(currentRoundRef.current + 1);

        if (
          fightersRef.current[0].stats.stamina <= 0 ||
          fightersRef.current[1].stats.stamina <= 0
        ) {
          setEvents((draft) => {
            draft.unshift({
              time: formatTime(roundTime),
              type: "announcement",
              message: `Fight over!`,
            });
          });
          clearInterval(fightInterval);
          clearInterval(timer!);
        }
      }, 2000);
    };

    if (isTimerRunning) {
      setEvents((draft) => {
        draft.push({
          time: `5:00`,
          type: "announcement",
          message: `Round is starting..`,
        });
      });

      startFightSimulation();

      timer = setInterval(() => {
        setRoundTime((prevTime) => {
          if (prevTime <= 1) {
            // End of the round
            clearInterval(timer!);
            setIsTimerRunning(false);
            clearInterval(fightInterval!); // Stop fight simulation
            setRound((prevRound) => prevRound + 1); // Increment round
            return 300; // Reset timer to 5 minutes
          }
          return prevTime - 1; // Decrement time
        });
      }, 1000); // 1-second interval for countdown
    }
  }, [isTimerRunning, setEvents, setFighters]);

  return (
    <div className="font-koulen bg-gray-100 min-h-screen flex flex-col items-center justify-start py-4 px-8">
      <h1 className="text-4xl font-bold text-center text-red-500">
        Fight Night
      </h1>
      <header className="w-full text-center">
        <h3>
          {fighters[0].name} vs {fighters[1].name}
        </h3>
        <div className="bg-red-700 p-2">
          {formatTime(roundTime)} - Round {round}
        </div>
        <button
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
          onClick={() => setIsTimerRunning((prev) => !prev)}
        >
          {isTimerRunning ? "Pause Timer" : "Start Timer"}
        </button>
      </header>
      <div className="grid grid-cols-[1fr_3fr_1fr] gap-2 items-stretch w-full p-4">
        <div className="flex flex-col items-center justify-start">
          <h2>{fighters[0].name}</h2>
          <h3>{fighters[0].nationality}</h3>
          <h3>Stamina: {fighters[0].stats.stamina}</h3>
        </div>
        <div
          ref={eventsContainerRef}
          className="border-red-900 border p-4 h-[600px] overflow-y-auto"
        >
          <h2>Events (Action {actionRound})</h2>
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
