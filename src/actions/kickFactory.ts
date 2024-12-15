import { IAttack, IFighter, KickType, MartialArtTechniqueType } from "../type";

const calculateSuccess = (
  attacker: IFighter,
  defender: IFighter,
  action: MartialArtTechniqueType
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

  return Math.random() > successChance;
};

export const kickFactory = (
  attacker: IFighter,
  defender: IFighter,
  baseAction: MartialArtTechniqueType
): IAttack[] => {
  const success = calculateSuccess(attacker, defender, baseAction);
  const damage =
    Math.floor(Math.random() * 10 + attacker.physical.strength) / 10; // TODO: Minus stamina and health

  const action: KickType = [
    "front kick",
    "roundhouse kick",
    "side kick",
    "back kick",
    "crescent kick",
    "axe kick",
    "spinning hook kick",
    "spinning back kick",
    "spinning crescent kick",
    "spinning axe kick",
    "spinning heel kick",
    "spinning sweep",
  ][Math.floor(Math.random() * 12)] as KickType;

  return [{ baseAction, action, success, damage }];
};
