import { createActionsNarrative } from "./actions/createActionNarrative";
import { actions as actionsData, fighters as fightersData } from "./data";
import { setInitiative } from "./actions/setInitiative";
import { IFighter } from "./type";
import { generateAttacks } from "./actions/generateAttacks";
import {
  addAnnouncement,
  updateFighterCard,
  updateRound,
  updateRoundClock,
} from "./helpers";

const [mike, floyd] = fightersData;

let isFightStarted = false;
let fightInterval: ReturnType<typeof setInterval> | null = null;
const defaultRoundClock = 10;
let roundClock = defaultRoundClock;
let round = 1;
const maxRounds = 5; // Title bout
let elapsedSeconds = 0;

export const fightSimulator = (
  fighter1: IFighter,
  fighter2: IFighter
): void => {
  const [attacker, defender] = setInitiative(fighter1, fighter2);

  // determine action based on the engagement
  if (attacker.inFight.engagement === "start position") {
    attacker.inFight.engagement = "striking distance";
    defender.inFight.engagement = "striking distance";

    addAnnouncement(
      `${attacker.name} is moving closer to ${defender.name}`,
      "event"
    );

    addAnnouncement("", "spacer");
  }

  const actions = generateAttacks(attacker, defender, actionsData);

  createActionsNarrative(attacker, defender, actions);
};

document.addEventListener("DOMContentLoaded", () => {
  // Initialize the round clock and round display
  updateRoundClock(roundClock);
  updateRound(round);

  const fighter1Card = document.querySelector(`#${mike.id}`);
  const fighter1CardTitle = fighter1Card!.querySelector("h1");
  fighter1CardTitle!.textContent = mike.name;
  updateFighterCard(mike);

  const fighter2Card = document.querySelector(`#${floyd.id}`);
  const fighter2CardTitle = fighter2Card!.querySelector("h1");
  fighter2CardTitle!.textContent = floyd.name;
  updateFighterCard(floyd);

  const button = document.querySelector("#fight-button") as HTMLButtonElement;

  button!.addEventListener("click", () => {
    if (isFightStarted) {
      if (fightInterval) {
        clearInterval(fightInterval);
      }

      button!.textContent = "Start Fight";
    } else {
      if (round > 1) {
        addAnnouncement(`Round ${round} begins!`);
      } else {
        addAnnouncement(
          `Today's fight is between <span class="text-blue-600">${mike.name}</span> and <span class="text-red-600">${floyd.name}</span>`
        );
      }
      addAnnouncement("", "spacer");

      fightInterval = setInterval(() => {
        // if fighter is knocked out, stop the fight
        if (mike.inFight.health <= 0 || floyd.inFight.health <= 0) {
          clearInterval(fightInterval!);

          button!.disabled = true;
          button!.textContent = "Fight over";

          addAnnouncement("The fight is over!");
          return;
        }

        if (roundClock > 0) {
          roundClock--;
          elapsedSeconds++;
          updateRoundClock(roundClock);

          if (elapsedSeconds % 3 === 0) {
            fightSimulator(mike, floyd);
          }
        } else {
          round++;
          updateRound(round);

          if (round >= maxRounds) {
            clearInterval(fightInterval!);
            button!.disabled = true;

            updateRoundClock(roundClock);
            addAnnouncement("The fight has gone the distance!");
            addAnnouncement(
              `Final Decision: ${
                mike.inFight.health > floyd.inFight.health
                  ? mike.name
                  : floyd.name
              } wins!`
            );
            return;
          } else {
            clearInterval(fightInterval!);
            fightInterval = null;
            isFightStarted = false;
            button!.textContent = "Start Next Round";

            addAnnouncement(`********* Round ${round} is over! *********`);
            addAnnouncement("", "spacer");

            // Increase the fighters' stamina
            mike.inFight.stamina = mike.inFight.stamina + 10;
            floyd.inFight.stamina = floyd.inFight.stamina + 10;

            // Reset bleeding
            mike.inFight.bleeding = 0;
            floyd.inFight.bleeding = 0;
          }

          // Reset the round clock for the next round
          roundClock = defaultRoundClock;
          elapsedSeconds = 0;
        }
        // Check for knockout
        if (mike.inFight.health <= 0 || floyd.inFight.health <= 0) {
          clearInterval(fightInterval!);
          button!.disabled = true;

          const winner =
            mike.inFight.health > floyd.inFight.health ? mike : floyd;
          addAnnouncement(`The fight is over! ${winner.name} wins!`);
        }
      }, 1000);
      button!.textContent = "Stop Fight";
    }

    isFightStarted = !isFightStarted;
  });
});
