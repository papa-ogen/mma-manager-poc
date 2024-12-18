import { AttackActionType, IFighter } from "../type";

export const kickVariants = (
  attacker: IFighter,
  defenderName: string,
  attackerAction: AttackActionType
) => {
  const attackerName = `${attacker.firstName} ${attacker.lastName}`;
  const attackerMainLeg =
    attacker.inFight.stance === "orthodox" ? "left" : "right";
  const attackerOffLeg = attackerMainLeg === "left" ? "right" : "left";
  const randomLeg = Math.random() > 0.5;

  let action = "";
  switch (attackerAction) {
    case "front":
      action = `${attackerMainLeg} front kick`;
      break;
    case "roundhouse":
      action = `${
        randomLeg ? attackerMainLeg : attackerOffLeg
      } roundhouse kick`;
      break;
    case "side":
      action = `${randomLeg ? attackerMainLeg : attackerOffLeg} side kick`;
      break;
    case "back":
      action = `${attackerMainLeg} back kick`;
      break;
    case "spinning":
      action = `${attackerMainLeg} spinning back kick`;
      break;
    case "crescent":
      action = `${randomLeg ? attackerMainLeg : attackerOffLeg} crescent kick`;
      break;
    case "axe":
      action = `${attackerMainLeg} axe kick`;
      break;
    case "push":
      action = `${attackerMainLeg} push kick`;
      break;
    case "oblique":
      action = `${attackerMainLeg} oblique kick`;
      break;
    case "flying":
      action = `${attackerMainLeg} flying kick`;
      break;
    case "jumping":
      action = `${attackerMainLeg} jumping kick`;
      break;
    default:
      action = `${attackerMainLeg} front kick`;
  }

  return [
    `${attackerName} is gearing up to throw a ${action}.`,
    `${attackerName} sets up to deliver a ${action}.`,
    `With precision, ${attackerName} plans to unleash a ${action}.`,
    `${attackerName} readies themselves for a ${action} attempt.`,
    `Looking for an opening, ${attackerName} prepares to execute a ${action}.`,
    `${attackerName} winds up, aiming to throw a ${action}.`,
    `${attackerName} focuses and prepares a sharp ${action}.`,
    `Confidently, ${attackerName} steps in to attempt a ${action}.`,
    `${attackerName} positions themselves for a powerful ${action}.`,
    `Eyes locked on ${defenderName}, ${attackerName} moves to throw a ${action}.`,
  ];
};
