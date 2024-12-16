import { IFighter } from "../type";

export const setInitiative = (
  fighter1: IFighter,
  fighter2: IFighter,
  randomFn: () => number = Math.random
): IFighter[] => {
  const initiative = randomFn() > 0.5;
  if (initiative) {
    return [fighter1, fighter2];
  } else {
    return [fighter2, fighter1];
  }
};
