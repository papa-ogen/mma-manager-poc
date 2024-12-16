import { IAttack, IFighter, MartialArtTechniqueType, PunchType } from "../type";

export const calculateSuccess = (
  attacker: IFighter,
  defender: IFighter,
  action: MartialArtTechniqueType,
  randomFn: () => number = Math.random
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

  return randomFn() > successChance;
};

export const getPunchAction = (randomFn: () => number = Math.random) => {
  const actions = [
    `jab`,
    `cross`,
    `hook`,
    `uppercut`,
    `overhand`,
    `backfist`,
    "superman punch",
  ] as PunchType[];

  return actions[Math.floor(randomFn() * actions.length)] as PunchType;
};

export const getDamage = (
  attacker: IFighter,
  punchType: PunchType,
  randomFn: () => number = Math.random
) => {
  let baseDamage = 0;
  switch (punchType) {
    case "jab":
      baseDamage = 1;
      break;
    case "cross":
      baseDamage = 2;
      break;
    case "hook":
      baseDamage = 3;
      break;
    case "uppercut":
      baseDamage = 4;
      break;
    case "overhand":
      baseDamage = 5;
      break;
    case "backfist":
      baseDamage = 6;
      break;
    case "superman punch":
      baseDamage = 7;
      break;
  }

  return Math.round(
    baseDamage +
      attacker.physical.strength +
      (attacker.physical.speed / 2) * (randomFn() * 10)
  );
};

export const punchFactory = (
  attacker: IFighter,
  defender: IFighter,
  baseAction: MartialArtTechniqueType
): IAttack[] => {
  const action = getPunchAction();

  const success = calculateSuccess(attacker, defender, baseAction);
  const damage = getDamage(attacker, action);

  return [{ baseAction, action, success, damage }];
};
