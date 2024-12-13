export type traitsType =
  | "Dirty Boxer"
  | "Initiative Taker"
  | "Smelly"
  | "Clumsy Brawler"
  | "Laughing Maniac"
  | "Tactical Sleepyhead"
  | "The Showman";

export interface Fighter {
  id: string;
  name: string;
  weightClass: string;
  background: string;
  nationality: string;
  stats: {
    striking: number;
    grappling: number;
    submission: number;
    stamina: number;
    defense: number;
    mentalToughness: number;
  };
  skills: {
    aggressiveness: number;
    counterStriking: number;
    clinchControl: number;
    kickPower: number;
    punchSpeed: number;
    groundDefense: number;
  };
  physical: {
    age: number;
    reach: number;
    height: number;
    weight: number;
    speed: number;
    stance: "southpaw" | "orthodox" | "all";
  };
  traits: traitsType[];
  record: {
    wins: number;
    losses: number;
    draws: number;
    knockouts: number;
    submissions: number;
    decisions: number;
  };
  fanPopularity: number;
}

type FightActionType = "throw" | "land" | "miss" | "disabled" | "announcement";

export interface IEvent {
  time: string;
  type: FightActionType;
  message: string;
}
