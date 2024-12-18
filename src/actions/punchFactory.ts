import { IAttack, IFighter, MartialArtTechniqueType, PunchType } from "../type";
import { calculateSuccess } from "./calculateSuccess";

export const getPunchAction = (randomFn: () => number = Math.random) => {
  const actions: { type: PunchType; weight: number }[] = [
    { type: "jab", weight: 5 },
    { type: "cross", weight: 4 },
    { type: "hook", weight: 3 },
    { type: "uppercut", weight: 2 },
    { type: "overhand", weight: 1 },
    { type: "backfist", weight: 1 },
    { type: "superman punch", weight: 1 },
  ];

  // Calculate the total weight
  const totalWeight = actions.reduce((sum, action) => sum + action.weight, 0);

  // Generate a random number between 0 and totalWeight
  const randomValue = randomFn() * totalWeight;

  // Select an action based on the randomValue
  let cumulativeWeight = 0;
  for (const action of actions) {
    cumulativeWeight += action.weight;
    if (randomValue < cumulativeWeight) {
      return action.type;
    }
  }

  // Fallback (this should theoretically never happen if weights are set correctly)
  return actions[0].type;
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

const getStaminaCost = (punchType: PunchType) => {
  switch (punchType) {
    case "jab":
      return 1;
    case "cross":
      return 2;
    case "hook":
      return 3;
    case "uppercut":
      return 3;
    case "overhand":
      return 4;
    case "backfist":
      return 4;
    case "superman punch":
      return 5;
  }
};

export const punchFactory = (
  attacker: IFighter,
  defender: IFighter,
  baseAction: MartialArtTechniqueType
): IAttack => {
  const action = getPunchAction();
  const success = calculateSuccess(attacker, defender, baseAction);
  const damage = getDamage(attacker, action);
  const stamina = getStaminaCost(action);

  return { baseAction, action, success, damage, stamina };
};
