import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  generateAttacks,
  getAvailableActions,
  getPreferredTechniques,
} from "../actions/generateAttacks";
import { IAction, IFighter } from "../type";
import { fighterTestData } from "./fighter_test_data";

const { fighter1, fighter2 } = fighterTestData;

// Mock the factories
vi.mock("./kickFactory", () => ({
  kickFactory: vi.fn(() => [{ baseAction: "mockKick" }]), // Mock implementation with vi.fn
}));

vi.mock("./punchFactory", () => ({
  punchFactory: vi.fn(() => [{ baseAction: "mockPunch" }]), // Mock implementation with vi.fn
}));

// Import the mocked factories
import * as punchFactoryModule from "../actions/punchFactory";
import * as kickFactoryModule from "../actions/kickFactory";

describe("generateAttacks", () => {
  beforeEach(() => {
    vi.spyOn(kickFactoryModule, "kickFactory").mockReturnValue({
      baseAction: "kick",
      action: "front",
      damage: 10,
      success: true,
      stamina: 10,
    });
    vi.spyOn(punchFactoryModule, "punchFactory").mockReturnValue({
      baseAction: "punch",
      action: "jab",
      damage: 7,
      success: true,
      stamina: 10,
    });
  });

  const mockAttacker: IFighter = fighter1;

  const mockDefender: IFighter = fighter2;

  const mockActions: IAction[] = [
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

  it("should call punchFactory when the selected action is 'punch'", () => {
    const result = generateAttacks(
      mockAttacker,
      mockDefender,
      mockActions,
      () => 0.1
    );

    expect(punchFactoryModule.punchFactory).toHaveBeenCalledWith(
      mockAttacker,
      mockDefender,
      "punch"
    );
    expect(result).toEqual([
      {
        baseAction: "punch",
        action: "jab",
        damage: 7,
        success: true,
        stamina: 10,
      },
    ]);
  });

  it("should call kickFactory when the selected action is 'kick'", () => {
    // Modify the attacker techniques to ensure "kick" is selected
    const attackerWithKick: IFighter = {
      ...mockAttacker,
      background: [{ name: "", techniques: ["kick"] }],
    };

    const result = generateAttacks(
      attackerWithKick,
      mockDefender,
      mockActions,
      () => 0.1
    );

    expect(kickFactoryModule.kickFactory).toHaveBeenCalledWith(
      attackerWithKick,
      mockDefender,
      "kick"
    );
    expect(result).toEqual([
      {
        baseAction: "kick",
        action: "front",
        damage: 10,
        success: true,
        stamina: 10,
      },
    ]);
  });

  it("should return 'circle' when stamina is too low", () => {
    const lowStaminaAttacker: IFighter = {
      ...mockAttacker,
      inFight: { ...mockAttacker.inFight, stamina: 5 },
    };

    const result = generateAttacks(
      lowStaminaAttacker,
      mockDefender,
      mockActions,
      () => 0.1
    );

    expect(result).toEqual([
      {
        action: "pivoting",
        baseAction: "circle",
        damage: 0,
        stamina: 10,
        success: true,
      },
    ]);
    expect(lowStaminaAttacker.inFight.engagement).toBe("distance");
    expect(mockDefender.inFight.engagement).toBe("distance");
  });

  it("should return the available actions for both fighters standing", () => {
    const result = getAvailableActions(mockAttacker, mockDefender, mockActions);
    expect(result).toEqual(mockActions[0]);
  });
  it("should return the available actions for defender laying down", () => {
    const defenderLayingDown: IFighter = {
      ...mockDefender,
      inFight: { ...mockDefender.inFight, posture: "laying down" },
    };
    const result = getAvailableActions(
      mockAttacker,
      defenderLayingDown,
      mockActions
    );
    expect(result).toEqual(mockActions[1]);
  });
  it("should return the available actions for both fighters laying down", () => {
    const attackerLayingDown: IFighter = {
      ...mockAttacker,
      inFight: { ...mockAttacker.inFight, posture: "laying down" },
    };
    const defenderLayingDown: IFighter = {
      ...mockDefender,
      inFight: { ...mockDefender.inFight, posture: "laying down" },
    };
    const result = getAvailableActions(
      attackerLayingDown,
      defenderLayingDown,
      mockActions
    );
    expect(result).toEqual(mockActions[2]);
  });
  it("should return the available actions for attacker laying down and defender standing", () => {
    const attackerLayingDown: IFighter = {
      ...mockAttacker,
      inFight: { ...mockAttacker.inFight, posture: "laying down" },
    };
    const result = getAvailableActions(
      attackerLayingDown,
      mockDefender,
      mockActions
    );
    expect(result).toEqual(mockActions[3]);
  });

  it("should give preferred techniques based on the attacker background", () => {
    const action: IAction = {
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
    };

    const attacker: IFighter = {
      ...mockAttacker,
      background: [
        { name: "", techniques: ["punch", "kick", "ground and pound"] },
      ],
    };

    const result = getPreferredTechniques(action, attacker);
    expect(result).toEqual(["punch", "kick"]);
  });
});
