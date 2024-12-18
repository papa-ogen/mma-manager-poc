import { IAttack, IFighter, KickType, MartialArtTechniqueType } from "../type";
import { calculateSuccess } from "./calculateSuccess";

export const getKickAction = (randomFn: () => number = Math.random) => {
  const actions = [
    "front",
    "roundhouse",
    "side",
    "back",
    "crescent",
    "axe",
    "spinning",
    "push",
    "oblique",
    "flying",
  ] as KickType[];

  return actions[Math.floor(randomFn() * actions.length)] as KickType;
};

export const getDamage = (
  attacker: IFighter,
  kickType: KickType,
  randomFn: () => number = Math.random
) => {
  let baseDamage = 0;
  switch (kickType) {
    case "front":
      baseDamage = 1;
      break;
    case "roundhouse":
      baseDamage = 3;
      break;
    case "side":
      baseDamage = 2;
      break;
    case "back":
      baseDamage = 2;
      break;
    case "crescent":
      baseDamage = 1;
      break;
    case "axe":
      baseDamage = 3;
      break;
    case "spinning":
      baseDamage = 3;
      break;
    case "push":
      baseDamage = 1;
      break;
    case "oblique":
      baseDamage = 1;
      break;
    case "flying":
      baseDamage = 2;
      break;
    case "jumping":
      baseDamage = 2;
  }

  return Math.round(
    baseDamage +
      attacker.physical.strength +
      (attacker.physical.speed / 2) * (randomFn() * 10)
  );
};

const getStaminaCost = (kickType: KickType) => {
  switch (kickType) {
    case "front":
      return 1;
    case "roundhouse":
      return 2;
    case "side":
      return 2;
    case "back":
      return 2;
    case "crescent":
      return 1;
    case "axe":
      return 3;
    case "spinning":
      return 3;
    case "push":
      return 1;
    case "oblique":
      return 1;
    case "flying":
      return 3;
    case "jumping":
      return 3;
  }
};

export const kickFactory = (
  attacker: IFighter,
  defender: IFighter,
  baseAction: MartialArtTechniqueType
): IAttack => {
  const action = getKickAction();
  const success = calculateSuccess(attacker, defender, baseAction);
  const damage = getDamage(attacker, action);
  const stamina = getStaminaCost(action);

  return { baseAction, action, success, damage, stamina };
};
