import { addAnnouncement, updateFighterCard } from "../helpers";
import {
  AttackActionType,
  IAttack,
  IFighter,
  MartialArtTechniqueType,
} from "../type";

const circlingVariants = (attackerName: string, defenderName: string) => {
  return [
    `${attackerName} feints a jab as they circle ${defenderName}, trying to find an opening.`,
    `${attackerName} moves laterally around ${defenderName}, studying their movements for a weak spot.`,
    `With quick footwork, ${attackerName} circles ${defenderName}, waiting for the perfect moment to strike.`,
    `${attackerName} shifts their weight as they circle ${defenderName}, gauging their distance carefully.`,
    `Staying light on their feet, ${attackerName} tests ${defenderName}'s defenses while circling.`,
    `${attackerName} paces around ${defenderName}, throwing the occasional feint to create an opening.`,
    `Eyes locked on their opponent, ${attackerName} moves side-to-side, looking for a chance to attack ${defenderName}.`,
    `Keeping their guard up, ${attackerName} circles ${defenderName}, probing for a moment of vulnerability.`,
    `${attackerName} weaves in and out of range as they circle ${defenderName}, ready to exploit any mistake.`,
    `Focused and methodical, ${attackerName} circles ${defenderName}, setting up their next move.`,
    `Referee breaks the fighters apart, ${attackerName} circles ${defenderName}, looking for an opening.`,
    `Referee gives the fighters a warning.`,
  ];
};

const punchVariants = (
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

const kickVariants = (
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

const getAttackVariant = (
  attacker: IFighter,
  defenderName: string,
  baseAction: MartialArtTechniqueType,
  action: AttackActionType
) => {
  switch (baseAction) {
    case "kick":
      return kickVariants(attacker, defenderName, action);
    case "punch":
    default:
      return punchVariants(attacker, defenderName, action);
  }
};

export const createActionsNarrative = (
  attacker: IFighter,
  defender: IFighter,
  attacks: IAttack[]
) => {
  const attackerName = `${attacker.firstName} ${attacker.lastName}`;
  const defenderName = `${defender.firstName} ${defender.lastName}`;

  // iterate over the attacks
  for (const attack of attacks) {
    const { baseAction, action, damage, success } = attack;
    if (baseAction === "circling") {
      // pick random circling variant
      const circlingVariant = circlingVariants(attackerName, defenderName)[
        Math.floor(
          Math.random() * circlingVariants(attackerName, defenderName).length
        )
      ];
      addAnnouncement(circlingVariant, "event");

      attacker.inFight.stamina += 5;
      break;
    }

    if (!action) return;

    const attackVariant = getAttackVariant(
      attacker,
      defenderName,
      baseAction,
      action
    )[
      Math.floor(
        Math.random() *
          getAttackVariant(attacker, defenderName, baseAction, action).length
      )
    ];

    addAnnouncement(attackVariant, "event");

    if (success) {
      // one in 1000 to land a critical hit
      const critical = Math.random() > 0.999;

      if (critical) {
        addAnnouncement(`**** KNOCKOUT! ****`, "fight");
        defender.inFight.health = 0;
        break;
      }
      // update the defender's health
      defender.inFight.health -= damage || 0;
      // update attacker stamina
      attacker.inFight.stamina -= 10;

      addAnnouncement(
        `${attackerName} successfully landed the ${baseAction}`,
        "fight"
      );

      addAnnouncement("", "spacer");

      if (defender.inFight.health <= 0) {
        addAnnouncement(`WHAT A KNOCKOUT!`, "big");
        break;
      } else if (defender.inFight.health < 20) {
        addAnnouncement(`${defenderName} is in a critical condition!`, "event");
      } else if (defender.inFight.health < 50) {
        addAnnouncement(`${defenderName} is hurt!`, "event");
      }
    } else {
      const blockAction = ["block", "dodge", "miss"];
      const blocked = blockAction[Math.floor(Math.random() * 3)];

      attacker.inFight.stamina -= 5;

      switch (blocked) {
        case "block":
          addAnnouncement(`${defenderName} blocked the ${baseAction}`, "info");
          break;
        case "dodge":
          addAnnouncement(`${defenderName} dodged the ${baseAction}`, "info");
          break;
        default:
          addAnnouncement(`${attackerName} missed the ${baseAction}`, "info");
          break;
      }
    }

    // if attacker stamina
    if (attacker.inFight.stamina <= 0) {
      addAnnouncement(`${attackerName} is out of stamina!`, "event");
      break;
    } else if (attacker.inFight.stamina < 20) {
      addAnnouncement(`${attackerName} is tired!`, "event");
    } else if (attacker.inFight.stamina < 50) {
      addAnnouncement(`${attackerName} is getting tired!`, "event");
    }

    addAnnouncement("", "spacer");
  }
  // update fighters health and stamina
  updateFighterCard(attacker);
  updateFighterCard(defender);
};
