import { AnnouncementType, IFighter } from "./type";

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

  health!.textContent = fighter.inFight.health.toString();
  stamina!.textContent = fighter.inFight.stamina.toString();
};
