import { IAttack, IFighter, MartialArtTechniqueType, PunchType } from "../type";

export const punchFactory = (
  attacker: IFighter,
  defender: IFighter,
  baseAction: MartialArtTechniqueType
): IAttack[] => {
  const attackerMainHand =
    attacker.inFight.stance === "orthodox" ? "left" : "right";
  const attackerOffHand = attackerMainHand === "left" ? "right" : "left";
  const randomHand = Math.random() > 0.5;

  const action: PunchType = [
    `${attackerOffHand} jab`,
    `${randomHand ? attackerMainHand : attackerOffHand} cross`,
    `${randomHand ? attackerMainHand : attackerOffHand} hook`,
    `${randomHand ? attackerMainHand : attackerOffHand} uppercut`,
    `${attackerMainHand} overhand`,
    `${randomHand ? attackerMainHand : attackerOffHand} backfist`,
    "superman punch",
  ][Math.floor(Math.random() * 7)] as PunchType;

  const success = Math.random() > 0.5; // TODO: Base this on the fighter's stats, speed, damage taken etc
  const damage = Math.floor(Math.random() * 10); // TODO: Base this on the fighter's stats, strength etc

  return [{ baseAction, action, success, damage }];
};
