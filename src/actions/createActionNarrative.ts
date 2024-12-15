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
        `${attacker.name} successfully landed the ${baseAction}`,
        "fight"
      );
    } else {
      // 50 / 50 if block or dodge
      const blocked = Math.random() > 0.5;
      if (blocked) {
        addAnnouncement(`${defender.name} blocked the ${baseAction}`, "info");
      } else {
        addAnnouncement(`${attacker.name} missed the ${baseAction}`, "info");
      }
    }

    // display fighters health and stamina
    updateFighterCard(attacker);

    updateFighterCard(defender);
  }
};
