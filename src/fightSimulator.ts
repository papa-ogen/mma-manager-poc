type MartialArtTechniqueType =
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
  | "moving away";
type PostureType = "standing" | "laying down" | "seated" | "crouching";
type EngagementType =
  | "grappling"
  | "striking distance"
  | "clinch"
  | "distance"
  | "start position";
type StanceType = "orthodox" | "southpaw" | "all";
type KickType =
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
type PunchType =
  | "jab"
  | "cross"
  | "hook"
  | "uppercut"
  | "overhand"
  | "backfist"
  | "superman";
type ElbowType =
  | "horizontal"
  | "vertical"
  | "slashing"
  | "upward"
  | "back"
  | "spinning";
type KneeType = "straight" | "curving" | "flying" | "jumping";
type GrapplingType =
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
type SubmissionType =
  | "armbar"
  | "kimura"
  | "triangle"
  | "choke"
  | "heel hook"
  | "kneebar"
  | "americana"
  | "omoplata";
interface IMartialArt {
  name: string;
  description: string;
  techniques: MartialArtTechniqueType[];
}
interface IFighter {
  name: string;
  weightClass: string;
  background: IMartialArt[];
  posture: PostureType;
  engagement: EngagementType;
  stance: StanceType;
  fightProperties: {
    health: number;
    stamina: number;
    injury: string[];
    initiative: boolean;
  };
}

const muayThai: IMartialArt = {
  name: "Muay Thai",
  description: "Thai kickboxing",
  techniques: ["punch", "kick", "elbow", "knee", "clinch"],
};

const wrestling: IMartialArt = {
  name: "Wrestling",
  description: "American wrestling",
  techniques: ["grappling", "takedown"],
};

const brazilianJiuJitsu: IMartialArt = {
  name: "Brazilian Jiu-Jitsu",
  description: "Ground fighting",
  techniques: ["submission", "grappling"],
};

const boxing: IMartialArt = {
  name: "Boxing",
  description: "American boxing",
  techniques: ["punch"],
};

interface IAction {
  attacker_posture: PostureType;
  defender_posture: PostureType;
  available_actions: MartialArtTechniqueType[];
}

const actions: IAction[] = [
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
  name: "Rodtang 'The Iron Man' Jitmuangnon",
  weightClass: "Lightweight",
  background: [muayThai, brazilianJiuJitsu],
  posture: "standing",
  engagement: "start position",
  stance: "orthodox",
  fightProperties: {
    health: 100,
    stamina: 100,
    injury: [],
    initiative: false,
  },
};

const fighter2: IFighter = {
  name: "Mike 'The Wrestler' Johnson",
  weightClass: "Middleweight",
  background: [boxing, wrestling],
  posture: "standing",
  engagement: "start position",
  stance: "southpaw",
  fightProperties: {
    health: 100,
    stamina: 100,
    injury: [],
    initiative: false,
  },
};

// colorize the console output
const colorize = (message: string, color: string): string => {
  return `\x1b[${color}m${message}\x1b[0m`;
};

export const fightSimulator = (
  fighter1: IFighter,
  fighter2: IFighter
): void => {
  let attacker = null;
  let defender = null;

  console.log(
    colorize(
      `Today's fight is between ${fighter1.name} and ${fighter2.name}`,
      "32"
    )
  );
  // First we need to determine initiative, 50 - 50 chance
  const initiative = Math.random() > 0.5;
  if (initiative) {
    attacker = fighter1;
    defender = fighter2;
  } else {
    attacker = fighter2;
    defender = fighter1;
  }

  console.log(colorize(`${attacker.name} has the initiative`, "31"));

  // determine action based on the engagement
  if (attacker.engagement === "start position") {
    // attacker is moving closer, update the engagement and console log
    attacker.engagement = "striking distance";
    console.log(
      colorize(`${attacker.name} is moving closer to ${defender.name}`, "35")
    );
  }

  // determine the action based on the posture
  const availableActions = actions.find(
    (action) =>
      action.attacker_posture === attacker.posture &&
      action.defender_posture === defender.posture
  );

  console.log(
    colorize(
      `Available actions: ${availableActions?.available_actions.join(", ")}`,
      "33"
    )
  );

  // determine prefered techniques based on the fighter's background
  const preferredTechniques = attacker.background
    .map((art) => art.techniques)
    .flat();

  console.log(
    colorize(
      `${attacker.name} prefers to use ${preferredTechniques.join(", ")}`,
      "34"
    )
  );

  // randomize the action based on the preferred techniques
  const action =
    preferredTechniques[Math.floor(Math.random() * preferredTechniques.length)];

  console.log(colorize(`${attacker.name} will attempt to ${action}`, "36"));

  // did it succeed?
  const success = Math.random() > 0.5;
  if (success) {
    console.log(
      colorize(`${attacker.name} successfully landed a ${action}`, "32")
    );
  } else {
    console.log(colorize(`${attacker.name} missed the ${action}`, "31"));
  }

  // update the defender's health
  defender.fightProperties.health -= 10;
  // update attacker stamina
  attacker.fightProperties.stamina -= 10;

  // display fighters health and stamina
  console.log(
    colorize(
      `${attacker.name} has ${attacker.fightProperties.health} health and ${attacker.fightProperties.stamina} stamina left`,
      "33"
    )
  );
  console.log(
    colorize(
      `${defender.name} has ${defender.fightProperties.health} health and ${defender.fightProperties.stamina} stamina left`,
      "33"
    )
  );
};

fightSimulator(fighter1, fighter2);
