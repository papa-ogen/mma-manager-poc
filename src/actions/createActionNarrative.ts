import { addAnnouncement, updateFighterCard } from "../helpers";
import { IAttack, IFighter } from "../type";

export const createActionsNarrative = (
  attacker: IFighter,
  defender: IFighter,
  attacks: IAttack[]
) => {
  // iterate over the attacks
  for (const attack of attacks) {
    const { baseAction, action, damage, success } = attack;
    addAnnouncement(
      `${attacker.name} will attempt to throw a ${action}`,
      "event"
    );

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
        `${attacker.name} successfully landed the ${baseAction} - ${damage}`,
        "fight"
      );

      addAnnouncement("", "spacer");

      if (defender.inFight.health <= 0) {
        addAnnouncement(`${defender.name} has been defeated!`, "big");
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

    // update fighters health and stamina
    updateFighterCard(attacker);
    updateFighterCard(defender);
  }
};
