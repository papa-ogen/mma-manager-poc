import { IFighter } from "../type";

export const setInitiative = (
  fighter1: IFighter,
  fighter2: IFighter
): IFighter[] => {
  const initiative = Math.random() > 0.5;
  if (initiative) {
    return [fighter1, fighter2];
  } else {
    return [fighter2, fighter1];
  }
};
