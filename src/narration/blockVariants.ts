import { BlockType } from "../type";

export const getBlockAction = (randomFn: () => number = Math.random) => {
  const blockAction = [
    "dodge",
    "miss",
    "block",
    "catch",
    "check",
    "slip",
    "roll",
    "lean",
    "pull",
    "push",
    "cover",
    "lock",
    "hold",
    "tie-up",
    "reversal",
    "escape",
  ] as BlockType[];

  return blockAction[Math.floor(randomFn() * blockAction.length)] as BlockType;
};

const getDodgeVariant = (
  attackerName: string,
  defenderName: string,
  randomFn: () => number = Math.random
) => {
  const dodgeVariants = [
    `${defenderName} evaded the attack from ${attackerName}`,
    `${defenderName} ducked under the attack from ${attackerName}`,
    `${defenderName} sidestepped the attack from ${attackerName}`,
    `${defenderName} weaved out of the way of the attack from ${attackerName}`,
    `${defenderName} slipped just in time to avoid the attack from ${attackerName}`,
    `${defenderName} leaned back to dodge the attack from ${attackerName}`,
    `${defenderName} twisted away from the attack from ${attackerName}`,
    `${defenderName} feinted and avoided the attack from ${attackerName}`,
    `${defenderName} shuffled back to dodge the attack from ${attackerName}`,
    `${defenderName} narrowly avoided the attack from ${attackerName}`,
    `${defenderName} turned away to evade the attack from ${attackerName}`,
    `The attack from ${attackerName} missed as ${defenderName} sidestepped gracefully`,
    `With quick reflexes, ${defenderName} evaded the incoming attack from ${attackerName}`,
    `A swift weave allowed ${defenderName} to escape ${attackerName}’s strike`,
    `The strike from ${attackerName} failed to connect as ${defenderName} shuffled back`,
    `A narrow escape for ${defenderName} as they avoided ${attackerName}’s attack`,
  ];

  return dodgeVariants[Math.floor(randomFn() * dodgeVariants.length)];
};

const getMissVariant = (
  attackerName: string,
  defenderName: string,
  randomFn: () => number = Math.random
) => {
  const missVariants = [
    `${attackerName} swung and missed ${defenderName}`,
    `${attackerName} failed to land the attack on ${defenderName}`,
    `${attackerName} overshot the attack on ${defenderName}`,
    `${attackerName} misjudged the distance and missed ${defenderName}`,
    `${attackerName} narrowly missed the attack on ${defenderName}`,
    `${attackerName} whiffed the attack on ${defenderName}`,
    `${attackerName} came up short with the attack on ${defenderName}`,
    `${attackerName} overextended and missed ${defenderName}`,
    `${attackerName} lost their aim and missed ${defenderName}`,
    `${attackerName} swung wide, missing ${defenderName}`,
    `${attackerName} launched the attack but missed ${defenderName}`,
    `A wild swing from ${attackerName} missed ${defenderName}`,
    `The attack from ${attackerName} overshot its mark and missed ${defenderName}`,
    `The strike from ${attackerName} went off-target, missing ${defenderName}`,
  ];

  return missVariants[Math.floor(randomFn() * missVariants.length)];
};

const getBlockVariant = (
  attackerName: string,
  defenderName: string,
  randomFn: () => number = Math.random
) => {
  const blockVariants = [
    `${defenderName} deflected the attack from ${attackerName}`,
    `${defenderName} parried the attack from ${attackerName}`,
    `${defenderName} absorbed the attack from ${attackerName}`,
    `${defenderName} shielded themselves from the attack from ${attackerName}`,
    `${defenderName} raised their guard to block the attack from ${attackerName}`,
    `${defenderName} braced and blocked the attack from ${attackerName}`,
    `${defenderName} caught the attack on their guard from ${attackerName}`,
    `${defenderName} nullified the attack from ${attackerName}`,
    `${defenderName} defused the attack from ${attackerName}`,
    `${defenderName} intercepted the attack from ${attackerName}`,
    `${defenderName} successfully blocked the attack from ${attackerName}`,
    `With quick reflexes, ${defenderName} blocked the attack from ${attackerName}`,
    `A well-timed block from ${defenderName} halted the attack from ${attackerName}`,
    `The attack was stopped cold as ${defenderName} defused ${attackerName}’s strike`,
  ];

  return blockVariants[Math.floor(randomFn() * blockVariants.length)];
};

export const blockVariant = (
  action: BlockType,
  attackerName: string,
  defenderName: string
) => {
  switch (action) {
    case "dodge":
    case "slip":
    case "roll":
    case "pull":
    case "escape":
      return getDodgeVariant(attackerName, defenderName);
    case "miss":
      return getMissVariant(attackerName, defenderName);
    case "block":
    case "catch":
    case "check":
    case "lock":
    case "tie-up":
    case "reversal":
    case "push":
    case "cover":
      return getBlockVariant(attackerName, defenderName);
  }
};
