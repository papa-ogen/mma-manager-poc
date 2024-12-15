import { AnnouncementType, IActionLog, IFightDecision, IFighter } from "./type";

export const addAnnouncement = (
  announcement: string,
  announcementType?: AnnouncementType
) => {
  const fightMonitor = document.getElementById("fight-monitor");
  if (!fightMonitor) {
    console.error("Fight monitor not found!");
    return;
  }

  const newEvent = document.createElement("p");
  newEvent.classList.add("text-sm");
  newEvent.classList.add("min-h-4");

  switch (announcementType) {
    case "fight":
      newEvent.classList.add("text-red-600");
      break;
    case "event":
      newEvent.classList.add("text-yellow-600");
      break;
    case "info":
      newEvent.classList.add("text-blue-600");
      break;
    case "spacer":
      newEvent.classList.add("text-gray-400");
      break;
    case "big":
      newEvent.classList.add("text-2xl");
      newEvent.classList.add("text-center");
      newEvent.classList.add("font-bold");
      newEvent.classList.add("text-red-600");
      break;
    case "narrative":
      newEvent.classList.add("italic");
      newEvent.classList.add("text-gray-600");
      break;
    default:
      newEvent.classList.add("text-gray-600");
  }

  newEvent.innerHTML = announcement;

  fightMonitor.appendChild(newEvent);

  const autoScroll = () => {
    fightMonitor!.scrollTop = fightMonitor!.scrollHeight;
  };

  autoScroll();
};

export const updateFighterCard = (fighter: IFighter) => {
  const fighterCard = document.querySelector(`#${fighter.id}`);
  const health = fighterCard!.querySelector(`#${fighter.id}-health > span`);
  const stamina = fighterCard!.querySelector(`#${fighter.id}-stamina > span`);

  // format health to number without decimal
  const formattedHealth = fighter.inFight.health.toFixed(0);

  health!.textContent = formattedHealth;
  stamina!.textContent = fighter.inFight.stamina.toString();
};

export const updateRound = (round: number) => {
  const roundElement = document.getElementById("fight-round");
  roundElement!.textContent = `${round}`;
};

export const updateRoundClock = (roundClock: number) => {
  const roundClockElement = document.getElementById("fight-clock");
  // convert round to minutes and seconds and display as string
  const minutes = Math.floor(roundClock / 60);
  // 2 leading zeros on seconds
  const seconds = `0${roundClock % 60}`.slice(-2);
  roundClockElement!.textContent = `${minutes}:${seconds}`;
};

export const getFightDecision = (
  fighter1: IFighter,
  fighter2: IFighter,
  actionLog: IActionLog[]
): IFightDecision[] => {
  const fightDecisions: IFightDecision[] = [];

  const scoreFighter1 = 0;
  const scoreFighter2 = 0;

  // Summarize and filter log first
  for (let i = 0; i < actionLog.length; i++) {
    const log = actionLog[i];
    const round = log.round;

    const roundLogsFighter1 = actionLog
      .filter((log) => log.round === round)
      .filter((log) => log.attackerId === fighter1.id);
    const roundLogsFighter2 = actionLog
      .filter((log) => log.round === round)
      .filter((log) => log.attackerId === fighter2.id);

    const fighter1Damage = roundLogsFighter1.reduce((acc, log) => {
      if (!log.action[0].damage) return acc;
      return acc + log.action[0].damage;
    }, 0);

    const fighter2Damage = roundLogsFighter2.reduce((acc, log) => {
      if (!log.action[0].damage) return acc;
      return acc + log.action[0].damage;
    }, 0);

    const fighter1Success = roundLogsFighter1.reduce((acc, log) => {
      return acc + (log.action[0].success ? 1 : 0);
    }, 0);

    const fighter2Success = roundLogsFighter2.reduce((acc, log) => {
      return acc + (log.action[0].success ? 1 : 0);
    }, 0);

    // fighter with the most damaga
    const mostDamage = fighter1Damage > fighter2Damage ? fighter1 : fighter2;

    // fighter with the most success
    const mostSuccess = fighter1Success > fighter2Success ? fighter1 : fighter2;

    // TODO: Refine the scoring system

    fightDecisions.push({
      round,
      scoreFighter1: mostDamage.id === fighter1.id ? 10 : 9,
      scoreFighter2: mostDamage.id === fighter2.id ? 10 : 9,
    });
  }

  return fightDecisions;
};
