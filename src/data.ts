import { IAction, IFighter, IMartialArt } from "./type";

// const muayThai: IMartialArt = {
//   name: "Muay Thai",
//   description: "Thai kickboxing",
//   techniques: ["punch", "kick", "elbow", "knee", "clinch"],
// };

// const wrestling: IMartialArt = {
//   name: "Wrestling",
//   description: "American wrestling",
//   techniques: ["grappling", "takedown"],
// };

// const brazilianJiuJitsu: IMartialArt = {
//   name: "Brazilian Jiu-Jitsu",
//   description: "Ground fighting",
//   techniques: ["submission", "grappling"],
// };

const streetFighting: IMartialArt = {
  name: "Street Fighting",
  description: "Street fighting",
  techniques: ["punch", "kick", "elbow", "knee", "clinch", "dirty boxing"],
};

const boxing: IMartialArt = {
  name: "Boxing",
  description: "American boxing",
  techniques: ["punch"],
};

export const actions: IAction[] = [
  {
    attacker_posture: "standing",
    defender_posture: "standing",
    available_actions: [
      "punch",
      "kick",
      "elbow",
      "knee",
      "clinch",
      "disengage",
      "takedown",
      "dirty boxing",
    ],
  },
  {
    attacker_posture: "standing",
    defender_posture: "laying down",
    available_actions: [
      "stomp",
      "soccer kick",
      "ground and pound",
      "submission",
    ],
  },
  {
    attacker_posture: "laying down",
    defender_posture: "laying down",
    available_actions: ["ground and pound", "submission", "stand up"],
  },
  {
    attacker_posture: "laying down",
    defender_posture: "standing",
    available_actions: ["upkick", "submission", "stand up"],
  },
];

const fighter1: IFighter = {
  id: "fighter3",
  firstName: "Mike",
  lastName: "Tyson",
  nickName: "Iron Mike",
  background: [boxing],
  physical: {
    age: 54,
    height: 178,
    weight: 100,
    reach: 180,
    speed: 80,
    strength: 90,
    stamina: 70,
    health: 100,
  },
  inFight: {
    stamina: 70,
    health: 100,
    initiative: false,
    bleeding: 0,
    posture: "standing",
    engagement: "start position",
    stance: "orthodox",
  },
  getFullName(withNickname = false) {
    if (!withNickname) {
      return `${this.firstName} ${this.lastName}`;
    }

    return `${this.firstName} "${this.nickName}" ${this.lastName}`;
  },
};

const fighter2: IFighter = {
  id: "fighter4",
  firstName: "Floyd",
  lastName: "Mayweather",
  nickName: "Money",
  background: [boxing],
  physical: {
    age: 43,
    height: 173,
    weight: 70,
    reach: 177,
    speed: 85,
    strength: 70,
    stamina: 90,
    health: 100,
  },
  inFight: {
    stamina: 90,
    health: 100,
    initiative: false,
    bleeding: 0,
    posture: "standing",
    engagement: "start position",
    stance: "orthodox",
  },
  getFullName(withNickname = false) {
    if (!withNickname) {
      return `${this.firstName} ${this.lastName}`;
    }

    return `${this.firstName} "${this.nickName}" ${this.lastName}`;
  },
};

// Simon The Savage Henriksen
const fighter3: IFighter = {
  id: "fighter4",
  firstName: "Simon",
  lastName: "Henriksen",
  nickName: "The Savage",
  background: [streetFighting],
  physical: {
    age: 30,
    height: 180,
    weight: 90,
    reach: 180,
    speed: 80,
    strength: 80,
    stamina: 80,
    health: 100,
  },
  inFight: {
    stamina: 80,
    health: 100,
    initiative: false,
    bleeding: 0,
    posture: "standing",
    engagement: "start position",
    stance: "orthodox",
  },
  getFullName(withNickname = false) {
    if (!withNickname) {
      return `${this.firstName} ${this.lastName}`;
    }

    return `${this.firstName} "${this.nickName}" ${this.lastName}`;
  },
};

export const fighters: IFighter[] = [fighter1, fighter3];
