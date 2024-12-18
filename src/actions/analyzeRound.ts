import { addAnnouncement } from "../helpers";
import { IActionLog, IFighter } from "../type";

export const analyzeRound = (
  actionLog: IActionLog[],
  currentRound: number,
  fighter1: IFighter,
  fighter2: IFighter
) => {
  const roundLogsFighter1 = actionLog
    .filter((log) => log.round === currentRound)
    .filter((log) => log.attackerId === fighter1.id);
  const roundLogsFighter2 = actionLog
    .filter((log) => log.round === currentRound)
    .filter((log) => log.attackerId === fighter2.id);

  const fighter1Damage = roundLogsFighter1.reduce((acc, log) => {
    if (!log.action[0].damage) return acc;
    return acc + log.action[0].damage;
  }, 0);

  const fighter2Damage = roundLogsFighter2.reduce((acc, log) => {
    if (!log.action[0].damage) return acc;
    return acc + log.action[0].damage;
  }, 0);

  const fighter1Success = roundLogsFighter1.reduce((acc, log) => {
    return acc + (log.action[0].success ? 1 : 0);
  }, 0);

  const fighter2Success = roundLogsFighter2.reduce((acc, log) => {
    return acc + (log.action[0].success ? 1 : 0);
  }, 0);

  const fighter1Health = fighter1.inFight.health - fighter2Damage;
  const fighter2Health = fighter2.inFight.health - fighter1Damage;

  const fighter1Stamina = fighter1.inFight.stamina;
  const fighter2Stamina = fighter2.inFight.stamina;

  // fighter with the most damaga
  const mostDamage = fighter1Damage > fighter2Damage ? fighter1 : fighter2;

  // fighter with the most success
  const mostSuccess = fighter1Success > fighter2Success ? fighter1 : fighter2;

  // fighter with the most health
  const mostHealth = fighter1Health > fighter2Health ? fighter1 : fighter2;
  const leastHealth = fighter1Health < fighter2Health ? fighter1 : fighter2;

  // fighter with the most stamina
  const mostStamina = fighter1Stamina > fighter2Stamina ? fighter1 : fighter2;
  const leastStamina = fighter1Stamina < fighter2Stamina ? fighter1 : fighter2;

  const mostAttacks =
    roundLogsFighter1.length > roundLogsFighter2.length ? fighter1 : fighter2;
  console.log(
    `${mostAttacks.getFullName()} really was the agressor this round.`
  );

  // narration
  if (mostDamage.id === mostSuccess.id) {
    addAnnouncement(
      `Very exiting round! ${mostDamage.getFullName()} dealt the a lot of damage in the round and landed most shots.`,
      "narrative"
    );
  } else {
    addAnnouncement(
      `Very exiting round! ${mostDamage.getFullName()} dealt more damage in the round but ${mostSuccess.getFullName()} landed the most shots.`,
      "narrative"
    );
  }

  addAnnouncement(
    `${leastStamina.getFullName()} is breathing heavily, while ${mostStamina.getFullName()} is still looking strong.`,
    "narrative"
  );

  if (leastHealth.inFight.health <= 80) {
    addAnnouncement(
      `${leastHealth.getFullName()} have a few bruises.`,
      "narrative"
    );
  }

  if (mostHealth.inFight.health >= 90 && mostHealth.inFight.stamina > 80) {
    addAnnouncement(
      `${mostHealth.getFullName()} is looking fresh and ready for the next round.`,
      "narrative"
    );
  }

  if (mostStamina.inFight.stamina <= 50 && leastStamina.inFight.stamina <= 50) {
    addAnnouncement(`Both fighters is looking tired.`, "narrative");
  }
};
