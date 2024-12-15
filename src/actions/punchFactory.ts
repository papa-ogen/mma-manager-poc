import { IAttack, IFighter, MartialArtTechniqueType, PunchType } from "../type";

const calculateSuccess = (
  attacker: IFighter,
  defender: IFighter,
  action: MartialArtTechniqueType
) => {
  // attacker speed vs defender speed
  const attackerSpeed = attacker.physical.speed;
  const defenderSpeed = defender.physical.speed;
  const speedDifference = attackerSpeed - defenderSpeed;
  const speedModifier = speedDifference / 100;
  // attacker stamina and health
  const attackerStamina = attacker.inFight.stamina;
  const staminaModifier = attackerStamina / 100;
  const attackerHealth = attacker.inFight.health;
  const healthModifier = attackerHealth / 100;

  // is action part of fighter's background?
  const actionIsPartOfBackground = attacker.background.some((art) =>
    art.techniques.includes(action)
  );

  const successChance =
    (0.5 +
      speedModifier +
      staminaModifier +
      healthModifier -
      (actionIsPartOfBackground ? 0.1 : 0)) /
    10;

  return Math.random() > successChance;
};

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

  const success = calculateSuccess(attacker, defender, baseAction);
  const damage = Math.floor(Math.random() * 10 + attacker.physical.strength); // TODO: Minus stamina and health

  return [{ baseAction, action, success, damage }];
};
