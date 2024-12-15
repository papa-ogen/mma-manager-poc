export type MartialArtTechniqueType =
  | "punch"
  | "kick"
  | "elbow"
  | "knee"
  | "takedown"
  | "submission"
  | "grappling"
  | "clinch"
  | "stomp"
  | "ground and pound"
  | "dirty boxing"
  | "soccer kick"
  | "upkick"
  | "stand up"
  | "disengage"
  | "moving closer"
  | "moving away"
  | "circling";
export type PostureType = "standing" | "laying down" | "seated" | "crouching";
export type EngagementType =
  | "grappling"
  | "striking distance"
  | "clinch"
  | "distance"
  | "start position";
export type StanceType = "orthodox" | "southpaw" | "all";
export type KickType =
  | "front"
  | "side"
  | "roundhouse"
  | "axe"
  | "push"
  | "crescent"
  | "spinning"
  | "back"
  | "oblique"
  | "flying"
  | "jumping";
export type PunchType =
  | "jab"
  | "cross"
  | "hook"
  | "uppercut"
  | "overhand"
  | "backfist"
  | "superman punch";
export type ElbowType =
  | "horizontal"
  | "vertical"
  | "slashing"
  | "upward"
  | "back"
  | "spinning";
export type KneeType = "straight" | "curving" | "flying" | "jumping";
export type GrapplingType =
  | "single leg"
  | "double leg"
  | "body lock"
  | "fireman's carry"
  | "hip toss"
  | "suplex"
  | "arm drag"
  | "bear hug"
  | "clinch"
  | "ground and pound";
export type SubmissionType =
  | "armbar"
  | "kimura"
  | "triangle"
  | "choke"
  | "heel hook"
  | "kneebar"
  | "americana"
  | "omoplata";
export interface IMartialArt {
  name: string;
  description: string;
  techniques: MartialArtTechniqueType[];
}
export interface IFighter {
  id: string;
  name: string;
  nickName?: string;
  background: IMartialArt[];
  physical: {
    age: number;
    height: number;
    weight: number;
    reach: number;
    speed: number;
    strength: number;
    cardio: number;
  };
  inFight: {
    initiative: boolean;
    stance: StanceType;
    posture: PostureType;
    engagement: EngagementType;
    health: number;
    stamina: number;
    bleeding: number;
  };
}

export interface IAction {
  attacker_posture: PostureType;
  defender_posture: PostureType;
  available_actions: MartialArtTechniqueType[];
}

export interface IAttack {
  baseAction: MartialArtTechniqueType;
  action?: PunchType;
  success?: boolean;
  damage?: number;
}

declare global {
  interface HTMLElementTagNameMap {
    "ui-button": Button;
  }
}

export type AnnouncementType = "fight" | "event" | "info";
