import { addAnnouncement, updateFighterCard } from "../helpers";
import {
  AttackActionType,
  IAttack,
  IFighter,
  MartialArtTechniqueType,
} from "../type";
import { blockVariant, getBlockAction } from "./blockVariants";
import { circleVariants } from "./circleVariants";
import { kickVariants } from "./kickVariants";
import { punchVariants } from "./punchVariants";

const getCircleVariant = (attackerName: string, defenderName: string) => {
  return circleVariants(attackerName, defenderName)[
    Math.floor(
      Math.random() * circleVariants(attackerName, defenderName).length
    )
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

const getRandomVariant = (variants: string[]) => {
  return variants[Math.floor(Math.random() * variants.length)];
};

export const createActionsNarrative = (
  attacker: IFighter,
  defender: IFighter,
  attacks: IAttack[]
) => {
  const attackerName = `${attacker.lastName}`;
  const defenderName = `${defender.lastName}`;

  // iterate over the attacks
  for (const attack of attacks) {
    const { baseAction, action, damage, success, stamina } = attack;
    if (baseAction === "circle") {
      // pick random circling variant
      const circlingVariant = getCircleVariant(attackerName, defenderName);

      addAnnouncement(circlingVariant, "event");

      attacker.inFight.stamina += stamina;
      break;
    }
    const attackVariant = getRandomVariant(
      getAttackVariant(attacker, defenderName, baseAction, action)
    );

    addAnnouncement(attackVariant, "info");

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
      attacker.inFight.stamina -= stamina;

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
      const blockAction = getBlockAction();
      const variant = blockVariant(blockAction, attackerName, defenderName);

      addAnnouncement(variant, "event");
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
  }

  addAnnouncement("", "spacer");

  // update fighters health and stamina
  updateFighterCard(attacker);
  updateFighterCard(defender);
};
