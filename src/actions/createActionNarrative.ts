import { addAnnouncement, updateFighterCard } from "../helpers";
import { IAttack, IFighter, PunchType } from "../type";

const circlingVariants = (attacker: IFighter, defender: IFighter) => {
  return [
    `${attacker.name} feints a jab as they circle ${defender.name}, trying to find an opening.`,
    `${attacker.name} moves laterally around ${defender.name}, studying their movements for a weak spot.`,
    `With quick footwork, ${attacker.name} circles ${defender.name}, waiting for the perfect moment to strike.`,
    `${attacker.name} shifts their weight as they circle ${defender.name}, gauging their distance carefully.`,
    `Staying light on their feet, ${attacker.name} tests ${defender.name}'s defenses while circling.`,
    `${attacker.name} paces around ${defender.name}, throwing the occasional feint to create an opening.`,
    `Eyes locked on their opponent, ${attacker.name} moves side-to-side, looking for a chance to attack ${defender.name}.`,
    `Keeping their guard up, ${attacker.name} circles ${defender.name}, probing for a moment of vulnerability.`,
    `${attacker.name} weaves in and out of range as they circle ${defender.name}, ready to exploit any mistake.`,
    `Focused and methodical, ${attacker.name} circles ${defender.name}, setting up their next move.`,
    `Referee breaks the fighters apart, ${attacker.name} circles ${defender.name}, looking for an opening.`,
    `Referee gives the fighters a warning.`,
  ];
};

const attackVariants = (
  attacker: IFighter,
  defender: IFighter,
  action: PunchType
) => {
  return [
    `${attacker.name} is gearing up to throw a ${action}.`,
    `${attacker.name} sets up to deliver a ${action}.`,
    `With precision, ${attacker.name} plans to unleash a ${action}.`,
    `${attacker.name} readies themselves for a ${action} attempt.`,
    `Looking for an opening, ${attacker.name} prepares to execute a ${action}.`,
    `${attacker.name} winds up, aiming to throw a ${action}.`,
    `${attacker.name} focuses and prepares a sharp ${action}.`,
    `Confidently, ${attacker.name} steps in to attempt a ${action}.`,
    `${attacker.name} positions themselves for a powerful ${action}.`,
    `Eyes locked on ${defender.name}, ${attacker.name} moves to throw a ${action}.`,
  ];
};

export const createActionsNarrative = (
  attacker: IFighter,
  defender: IFighter,
  attacks: IAttack[]
) => {
  // iterate over the attacks
  for (const attack of attacks) {
    const { baseAction, action, damage, success } = attack;
    if (baseAction === "circling") {
      // pick random circling variant
      const circlingVariant = circlingVariants(attacker, defender)[
        Math.floor(Math.random() * circlingVariants(attacker, defender).length)
      ];
      addAnnouncement(circlingVariant);

      attacker.inFight.stamina += 5;
      break;
    }

    if (!action) return;

    const attackVariant = attackVariants(attacker, defender, action)[
      Math.floor(
        Math.random() * attackVariants(attacker, defender, action).length
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
        `${attacker.name} successfully landed the ${baseAction}`,
        "fight"
      );

      addAnnouncement("", "spacer");

      if (defender.inFight.health <= 0) {
        addAnnouncement(`WHAT A KNOCKOUT!`, "big");
        break;
      } else if (defender.inFight.health < 20) {
        addAnnouncement(
          `${defender.name} is in a critical condition!`,
          "event"
        );
      } else if (defender.inFight.health < 50) {
        addAnnouncement(`${defender.name} is hurt!`, "event");
      }
    } else {
      const blockAction = ["block", "dodge", "miss"];
      const blocked = blockAction[Math.floor(Math.random() * 3)];

      attacker.inFight.stamina -= 5;

      switch (blocked) {
        case "block":
          addAnnouncement(`${defender.name} blocked the ${baseAction}`, "info");
          break;
        case "dodge":
          addAnnouncement(`${defender.name} dodged the ${baseAction}`, "info");
          break;
        default:
          addAnnouncement(`${attacker.name} missed the ${baseAction}`, "info");
          break;
      }
    }

    // if attacker stamina
    if (attacker.inFight.stamina <= 0) {
      addAnnouncement(`${attacker.name} is out of stamina!`, "event");
      break;
    } else if (attacker.inFight.stamina < 20) {
      addAnnouncement(`${attacker.name} is tired!`, "event");
    } else if (attacker.inFight.stamina < 50) {
      addAnnouncement(`${attacker.name} is getting tired!`, "event");
    }

    addAnnouncement("", "spacer");
  }
  // update fighters health and stamina
  updateFighterCard(attacker);
  updateFighterCard(defender);
};
