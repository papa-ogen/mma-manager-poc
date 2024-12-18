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
  | "circle";
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
export type BlockType =
  | "dodge"
  | "miss"
  | "block"
  | "catch"
  | "check"
  | "slip"
  | "roll"
  | "pull"
  | "push"
  | "cover"
  | "lock"
  | "tie-up"
  | "reversal"
  | "escape";

export type CircleType =
  | "circling"
  | "moving around"
  | "taunting"
  | "sidestepping"
  | "backpedaling"
  | "feinting"
  | "dancing"
  | "pivoting"
  | "shuffling"
  | "resetting";
export interface IMartialArt {
  name: string;
  description?: string;
  techniques: MartialArtTechniqueType[];
}
export interface IFighter {
  id: string;
  firstName: string;
  lastName: string;
  nickName?: string;
  background: IMartialArt[];
  physical: {
    age: number;
    height: number;
    weight: number;
    reach: number;
    speed: number;
    strength: number;
    stamina: number;
    health: number;
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
  getFullName: (withNickname?: boolean) => string;
}

export interface IAction {
  attacker_posture: PostureType;
  defender_posture: PostureType;
  available_actions: MartialArtTechniqueType[];
}

export interface IActionLog {
  round: number;
  time: number;
  action: IAttack[];
  attackerId: string;
}

export type AttackActionType =
  | PunchType
  | KickType
  | ElbowType
  | KneeType
  | GrapplingType
  | CircleType;
export interface IAttack {
  baseAction: MartialArtTechniqueType;
  action: AttackActionType;
  success: boolean;
  damage: number;
  stamina: number;
}

declare global {
  interface HTMLElementTagNameMap {
    "ui-button": Button;
  }
}

export type AnnouncementType =
  | "fight"
  | "event"
  | "info"
  | "spacer"
  | "big"
  | "narrative";

export interface IFightDecision {
  round: number;
  scoreFighter1: number;
  scoreFighter2: number;
}

export type FighterLimbType = "left" | "right";
