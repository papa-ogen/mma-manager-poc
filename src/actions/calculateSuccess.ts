import { IFighter, MartialArtTechniqueType } from "../type";

export const calculateSuccess = (
  attacker: IFighter,
  defender: IFighter,
  action: MartialArtTechniqueType,
  randomFn: () => number = Math.random
) => {
  // attacker speed vs defender speed
  const attackerSpeed = attacker.physical.speed;
  const defenderSpeed = defender.physical.speed;
  const speedDifference = attackerSpeed - defenderSpeed;
  const speedModifier = speedDifference / 100;
  // attacker stamina and health
  const attackerStamina = attacker.inFight.stamina;
  const staminaModifier = attackerStamina / 100;
  const attackerHealth = attacker.inFight.health;
  const healthModifier = attackerHealth / 100;

  // is action part of fighter's background?
  const actionIsPartOfBackground = attacker.background.some((art) =>
    art.techniques.includes(action)
  );

  const successChance =
    (0.5 +
      speedModifier +
      staminaModifier +
      healthModifier -
      (actionIsPartOfBackground ? 0.1 : 0)) /
    10;

  return randomFn() > successChance;
};
