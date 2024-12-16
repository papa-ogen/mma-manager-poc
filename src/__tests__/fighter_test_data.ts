import { boxing, muayThai, streetFighting } from "../data";
import { IFighter } from "../type";

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
    speed: 7,
    strength: 7,
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
    speed: 7,
    strength: 6,
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
  id: "fighter3",
  firstName: "Simon",
  lastName: "Henriksen",
  nickName: "The Savage",
  background: [streetFighting],
  physical: {
    age: 30,
    height: 180,
    weight: 90,
    reach: 180,
    speed: 7,
    strength: 6,
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

// Jörgen Kruth
const fighter4: IFighter = {
  id: "fighter4",
  firstName: "Jörgen",
  lastName: "Kruth",
  nickName: "",
  background: [muayThai],
  physical: {
    age: 30,
    height: 180,
    weight: 90,
    reach: 180,
    speed: 5,
    strength: 7,
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

    return `${this.firstName} ${this.lastName}`;
  },
};

export const fighterTestData = {
  fighter1,
  fighter2,
  fighter3,
  fighter4,
};
