import { createActionsNarrative } from "./narration/createActionNarrative";
import { actions as actionsData } from "./data";
import { setInitiative } from "./actions/setInitiative";
import { IActionLog, IFighter } from "./type";
import { generateAttacks } from "./actions/generateAttacks";
import {
  addAnnouncement,
  getFightDecision,
  updateFighterCard,
  updateRound,
  updateRoundClock,
} from "./helpers";
import { analyzeRound } from "./actions/analyzeRound";
import { fighterTestData } from "./__tests__/fighter_test_data";

const { fighter1: fighter1Data, fighter2: fighter2Data } = fighterTestData;

let isFightStarted = false;
let fightInterval: ReturnType<typeof setInterval> | null = null;
const defaultRoundClock = 10;
let roundClock = defaultRoundClock;
let round = 1;
const maxRounds = 5; // Title bout
let elapsedSeconds = 0;
const actionLog: IActionLog[] = [];
let currentInitiative: IFighter | null = null;

export const fightSimulator = (
  fighter1: IFighter,
  fighter2: IFighter
): void => {
  const [attacker, defender] = setInitiative(
    fighter1,
    fighter2,
    currentInitiative
  );

  currentInitiative = attacker;

  // determine action based on the engagement
  if (attacker.inFight.engagement === "start position") {
    attacker.inFight.engagement = "striking distance";
    defender.inFight.engagement = "striking distance";

    addAnnouncement(
      `${attacker.firstName} is moving closer to ${defender.firstName}`,
      "event"
    );

    addAnnouncement("", "spacer");
  }

  const actions = generateAttacks(attacker, defender, actionsData);

  actionLog.push({
    round,
    time: elapsedSeconds,
    action: actions,
    attackerId: attacker.id,
  });

  createActionsNarrative(attacker, defender, actions);
};

document.addEventListener("DOMContentLoaded", () => {
  // Initialize the round clock and round display
  updateRoundClock(roundClock);
  updateRound(round);

  const fighter1Card = document.querySelector(`#${fighter1Data.id}`);
  const fighter1CardTitle = fighter1Card!.querySelector("h1");
  fighter1CardTitle!.textContent = fighter1Data.getFullName(true);
  updateFighterCard(fighter1Data);

  const fighter2Card = document.querySelector(`#${fighter2Data.id}`);
  const fighter2CardTitle = fighter2Card!.querySelector("h1");
  fighter2CardTitle!.textContent = fighter2Data.getFullName(true);
  updateFighterCard(fighter2Data);

  const button = document.querySelector("#fight-button") as HTMLButtonElement;

  button!.addEventListener("click", () => {
    if (isFightStarted) {
      if (fightInterval) {
        clearInterval(fightInterval);
      }

      button!.textContent = "Start Fight";
    } else {
      if (round > 1) {
        addAnnouncement("", "spacer");
        addAnnouncement(`Round ${round} begins!`);
        updateRound(round);
      } else {
        addAnnouncement(
          `Today's fight is between <span class="text-blue-600">${fighter1Data.firstName} ${fighter1Data.lastName}</span> and <span class="text-red-600">${fighter2Data.firstName} ${fighter2Data.lastName}</span>`,
          "narrative"
        );
      }
      addAnnouncement("", "spacer");

      fightInterval = setInterval(() => {
        // if fighter is knocked out, stop the fight
        if (
          fighter1Data.inFight.health <= 0 ||
          fighter2Data.inFight.health <= 0
        ) {
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
            fightSimulator(fighter1Data, fighter2Data);
          }
        } else {
          round++;

          if (round > maxRounds) {
            clearInterval(fightInterval!);
            button!.disabled = true;

            updateRoundClock(roundClock);
            addAnnouncement("The fight has gone the distance!");
            // addAnnouncement(
            //   `Final Decision: ${
            //     fighter1Data.inFight.health > fighter2Data.inFight.health
            //       ? fighter1Data.getFullName()
            //       : fighter2Data.getFullName()
            //   } wins!`
            // );

            const fightDecision = getFightDecision(
              fighter1Data,
              fighter2Data,
              actionLog
            );
            const fighter1Score = fightDecision.reduce((acc, decision) => {
              return acc + (decision.scoreFighter1 ? 1 : 0);
            }, 0);

            const fighter2Score = fightDecision.reduce((acc, decision) => {
              return acc + (decision.scoreFighter2 ? 1 : 0);
            }, 0);

            const winner =
              fighter1Score > fighter2Score ? fighter1Data : fighter2Data;

            addAnnouncement(
              `The fight is over! ${winner.firstName} ${winner.lastName} wins!`,
              "big"
            );

            // display score per round
            // fightDecision.forEach((decision) => {
            //   addAnnouncement(
            //     `Round ${decision.round}: ${fighter1Data.getFullName()} ${
            //       decision.scoreFighter1
            //     } - ${fighter2Data.getFullName()} ${decision.scoreFighter2}`
            //   );
            // });

            return;
          } else {
            clearInterval(fightInterval!);
            fightInterval = null;
            isFightStarted = false;
            button!.textContent = "Start Next Round";

            addAnnouncement(`********* Round ${round - 1} is over! *********`);
            addAnnouncement("", "spacer");

            analyzeRound(actionLog, round, fighter1Data, fighter2Data);

            // Increase the fighters' stamina
            fighter1Data.inFight.stamina = fighter1Data.inFight.stamina + 10;
            fighter2Data.inFight.stamina = fighter2Data.inFight.stamina + 10;

            // Reset bleeding
            fighter1Data.inFight.bleeding = 0;
            fighter2Data.inFight.bleeding = 0;
          }

          // Reset the round clock for the next round
          roundClock = defaultRoundClock;
          elapsedSeconds = 0;
        }
        // Check for knockout
        if (
          fighter1Data.inFight.health <= 0 ||
          fighter2Data.inFight.health <= 0
        ) {
          clearInterval(fightInterval!);
          button!.disabled = true;

          const winner =
            fighter1Data.inFight.health > fighter2Data.inFight.health
              ? fighter1Data
              : fighter2Data;

          addAnnouncement(
            `The fight is over! ${winner.firstName} ${winner.lastName} wins!`
          );

          console.log(actionLog);
        }
      }, 1000);
      button!.textContent = "Stop Fight";
    }

    isFightStarted = !isFightStarted;
  });
});
