import { fighters } from "./fighters";
import { Fighter } from "./type";

// Color helper function for better visibility in the console
const colorize = (text: string, color: string) => {
  return `\x1b[38;5;${color}m${text}\x1b[0m`;
};

// Apply traits effects
const applyFightStyleEffect = (attacker: Fighter, defender: Fighter) => {
  if (attacker.traits.includes("Dirty Boxer")) {
    if (Math.random() < 0.2) {
      console.log(colorize(`${attacker.name} throws a low blow!`, "196"));
      defender.stats.defense -= 5; // Temporary defense penalty
    }
  }

  if (attacker.traits.includes("Smelly")) {
    if (Math.random() < 0.3) {
      console.log(
        colorize(
          `${attacker.name}'s smell distracts ${defender.name}, lowering their focus!`,
          "208"
        )
      );
      defender.stats.mentalToughness -= 10; // Temporary mental toughness penalty
    }
  }

  if (attacker.traits.includes("Laughing Maniac")) {
    if (Math.random() < 0.15) {
      console.log(
        colorize(
          `${attacker.name} laughs uncontrollably, confusing ${defender.name}!`,
          "202"
        )
      );
      defender.stats.mentalToughness -= 5; // Slight mental toughness penalty
    }
  }
};

// Simulate a round of fighting
const simulateFightRound = (fighterA: Fighter, fighterB: Fighter) => {
  // Determine which fighter is taking the action (50% chance for either fighter)
  const attacker = Math.random() > 0.5 ? fighterA : fighterB;
  const defender = attacker === fighterA ? fighterB : fighterA;

  // Apply fight style effects before the action
  applyFightStyleEffect(attacker, defender);

  // Simulate an action (strike, kick, takedown, etc.)
  const actions = ["strike", "kick", "takedown", "clinch"];
  const action = actions[Math.floor(Math.random() * actions.length)];

  // Handle different actions
  switch (action) {
    case "strike":
      console.log(colorize(`${attacker.name} throws a punch!`, "35"));
      if (Math.random() < 0.7) {
        console.log(colorize(`${attacker.name} lands the strike!`, "32"));
        defender.stats.stamina -= 5; // Decrease stamina for the defender
      } else {
        console.log(colorize(`${attacker.name} misses the strike!`, "31"));
      }
      break;

    case "kick":
      console.log(colorize(`${attacker.name} throws a kick!`, "34"));
      if (Math.random() < 0.6) {
        console.log(colorize(`${attacker.name} lands the kick!`, "32"));
        defender.stats.stamina -= 10; // Decrease stamina for the defender
      } else {
        console.log(colorize(`${attacker.name} misses the kick!`, "31"));
      }
      break;

    case "takedown":
      console.log(colorize(`${attacker.name} attempts a takedown!`, "36"));
      if (Math.random() < 0.5) {
        console.log(
          colorize(
            `${attacker.name} successfully takes down ${defender.name}!`,
            "32"
          )
        );
        defender.stats.stamina -= 15; // Heavy stamina penalty for being taken down
      } else {
        console.log(colorize(`${attacker.name} fails the takedown!`, "31"));
      }
      break;

    case "clinch":
      console.log(
        colorize(`${attacker.name} pulls ${defender.name} into a clinch!`, "33")
      );
      if (Math.random() < 0.8) {
        console.log(colorize(`${attacker.name} controls the clinch!`, "32"));
        defender.stats.stamina -= 5; // Moderate stamina penalty for being in a clinch
      } else {
        console.log(
          colorize(`${attacker.name} is unable to control the clinch!`, "31")
        );
      }
      break;

    default:
      console.log("Unknown action!");
      break;
  }

  // Show current stats
  console.log(
    colorize(`${fighterA.name}'s stamina: ${fighterA.stats.stamina}`, "90")
  );
  console.log(
    colorize(`${fighterB.name}'s stamina: ${fighterB.stats.stamina}`, "90")
  );
};

// Simulate the fight in intervals
const startFightSimulation = () => {
  let round = 1;
  const interval = setInterval(() => {
    console.log(colorize(`\nRound ${round}...`, "96"));
    simulateFightRound(fighters[0], fighters[1]);
    round++;

    // End the fight if either fighter's stamina reaches 0
    if (fighters[0].stats.stamina <= 0 || fighters[1].stats.stamina <= 0) {
      console.log(colorize("\nFight over!", "31"));
      clearInterval(interval);
    }
  }, 2000); // Fight rounds run every 2 seconds
};

// Start the simulation
startFightSimulation();
