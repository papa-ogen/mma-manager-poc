import { IAction, IMartialArt } from "./type";

export const muayThai: IMartialArt = {
  name: "Muay Thai",
  description: "Thai kickboxing",
  techniques: ["punch", "kick", "elbow", "knee", "clinch"],
};

export const wrestling: IMartialArt = {
  name: "Wrestling",
  description: "American wrestling",
  techniques: ["grappling", "takedown"],
};

export const brazilianJiuJitsu: IMartialArt = {
  name: "Brazilian Jiu-Jitsu",
  description: "Ground fighting",
  techniques: ["submission", "grappling"],
};

export const streetFighting: IMartialArt = {
  name: "Street Fighting",
  description: "Street fighting",
  techniques: ["punch", "kick", "elbow", "knee", "clinch", "dirty boxing"],
};

export const boxing: IMartialArt = {
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
