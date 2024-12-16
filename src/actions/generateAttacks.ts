import { IAction, IAttack, IFighter } from "../type";
import { kickFactory } from "./kickFactory";
import { punchFactory } from "./punchFactory";

export const getAvailableActions = (
  attacker: IFighter,
  defender: IFighter,
  actions: IAction[]
) => {
  return actions.find(
    (action) =>
      action.attacker_posture === attacker.inFight.posture &&
      action.defender_posture === defender.inFight.posture
  ) as IAction;
};

export const getPreferredTechniques = (action: IAction, attacker: IFighter) => {
  return action.available_actions.filter((technique) =>
    attacker.background.some((art) => art.techniques.includes(technique))
  );
};

export const generateAttacks = (
  attacker: IFighter,
  defender: IFighter,
  actions: IAction[]
): IAttack[] => {
  // determine the action based on the posture
  const availableActions = getAvailableActions(attacker, defender, actions);

  // filter available actions based on attacker background
  const preferredTechniques = getPreferredTechniques(
    availableActions,
    attacker
  );

  // randomize the action based on the preferred techniques
  let action =
    preferredTechniques[Math.floor(Math.random() * preferredTechniques.length)];

  // TODO: Action will also be based on health and stamina
  if (attacker.inFight.stamina < 10) {
    attacker.inFight.engagement = "distance";
    defender.inFight.engagement = "distance";
    action = "circling";
  }

  // TODO: ["elbow", "knee", "clinch", "dirty boxing"],
  switch (action) {
    case "punch":
      return punchFactory(attacker, defender, action);
    case "kick":
      return kickFactory(attacker, defender, action);
    case "elbow":
      return [{ baseAction: "elbow" }];
    case "knee":
      return [{ baseAction: "knee" }];
    default:
      return [{ baseAction: "circling" }];
  }
};
