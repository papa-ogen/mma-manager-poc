import { describe, expect, it } from "vitest";
import { setInitiative } from "../actions/setInitiative";
import { fighterTestData } from "./fighter_test_data";

const { fighter1, fighter2 } = fighterTestData;

describe("setInitiative based on different parameters", () => {
  it("should return the first fighter as the attacker if the first fighter has a higher initiative", () => {
    const mockRandom = () => 0.6;

    const [attacker] = setInitiative(fighter1, fighter2, mockRandom);
    expect(attacker).toEqual(fighter1);
  });

  it("should return the second fighter as the attacker if the second fighter has a higher initiative", () => {
    const mockRandom = () => 0.4;

    const [attacker] = setInitiative(fighter1, fighter2, mockRandom);
    expect(attacker).toEqual(fighter2);
  });
});
