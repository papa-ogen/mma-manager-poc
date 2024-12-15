import { IAction, IAttack, IFighter } from "../type";
import { punchFactory } from "./punchFactory";

export const generateAttacks = (
  attacker: IFighter,
  defender: IFighter,
  actions: IAction[]
): IAttack[] => {
  // determine the action based on the posture
  const availableActions = actions.find(
    (action) =>
      action.attacker_posture === attacker.inFight.posture &&
      action.defender_posture === defender.inFight.posture
  ) || { available_actions: [] };

  // filter available actions based on attacker background
  const preferredTechniques = availableActions.available_actions.filter(
    (technique) =>
      attacker.background.some((art) => art.techniques.includes(technique))
  );

  // randomize the action based on the preferred techniques
  const action =
    preferredTechniques[Math.floor(Math.random() * preferredTechniques.length)];

  switch (action) {
    case "punch":
      return punchFactory(attacker, defender, action);
    default:
      return [{ baseAction: "circling" }];
  }
};
