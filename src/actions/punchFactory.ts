import { IAttack, IFighter, MartialArtTechniqueType, PunchType } from "../type";
import { calculateSuccess } from "./calculateSuccess";

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
      baseDamage = 3;
      break;
    case "overhand":
      baseDamage = 4;
      break;
    case "backfist":
      baseDamage = 4;
      break;
    case "superman punch":
      baseDamage = 5;
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
