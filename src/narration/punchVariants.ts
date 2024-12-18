import { AttackActionType, IFighter } from "../type";

export const punchVariants = (
  attacker: IFighter,
  defenderName: string,
  attackerAction: AttackActionType
) => {
  const attackerName = `${attacker.firstName} ${attacker.lastName}`;
  const attackerMainHand =
    attacker.inFight.stance === "orthodox" ? "left" : "right";
  const attackerOffHand = attackerMainHand === "left" ? "right" : "left";
  const randomHand = Math.random() > 0.5;

  let action = "";
  switch (attackerAction) {
    case "jab":
      action = `${attackerOffHand} jab`;
      break;
    case "cross":
      action = `${randomHand ? attackerMainHand : attackerOffHand} cross`;
      break;
    case "hook":
      action = `${randomHand ? attackerMainHand : attackerOffHand} hook`;
      break;
    case "uppercut":
      action = `${randomHand ? attackerMainHand : attackerOffHand} uppercut`;
      break;
    case "overhand":
      action = `${attackerMainHand} overhand`;
      break;
    case "backfist":
      action = `${randomHand ? attackerMainHand : attackerOffHand} backfist`;
      break;
    case "superman punch":
      action = "superman punch";
      break;
    default:
      action = `${attackerOffHand} jab`;
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
