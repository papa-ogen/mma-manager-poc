import { IFighter } from "../type";

export const setInitiative = (
  fighter1: IFighter,
  fighter2: IFighter,
  currentInitiative: IFighter | null,
  randomFn: () => number = Math.random
): IFighter[] => {
  const modifier = !currentInitiative
    ? 0.5
    : currentInitiative.id === fighter1.id
    ? 0.4
    : 0.6;
  return randomFn() > modifier ? [fighter1, fighter2] : [fighter2, fighter1];
};
