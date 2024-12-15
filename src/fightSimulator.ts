import { createActionsNarrative } from "./actions/createActionNarrative";
import { actions as actionsData, fighters as fightersData } from "./data";
import { setInitiative } from "./actions/setInitiative";
import { IFighter } from "./type";
import { generateAttacks } from "./actions/generateAttacks";
import { addAnnouncement, updateFighterCard } from "./helpers";

const [mike, floyd] = fightersData;

let isFightStarted = false;
let fightInterval: ReturnType<typeof setInterval> | null = null;

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
      addAnnouncement(
        `Today's fight is between <span class="text-blue-600">${mike.name}</span> and <span class="text-red-600">${floyd.name}</span>`
      );

      addAnnouncement("", "spacer");

      fightInterval = setInterval(() => {
        // if fighter is knocked out, stop the fight
        if (mike.inFight.health <= 0 || floyd.inFight.health <= 0) {
          clearInterval(fightInterval!);

          button!.disabled = true;

          addAnnouncement("The fight is over!");
          return;
        }
        fightSimulator(mike, floyd);
      }, 3000);
      button!.textContent = "Stop Fight";
    }

    isFightStarted = !isFightStarted;
  });
});
