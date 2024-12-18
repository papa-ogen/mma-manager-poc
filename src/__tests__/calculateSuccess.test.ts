import { describe, expect, it } from "vitest";
import { calculateSuccess } from "../actions/calculateSuccess";
import { fighterTestData } from "./fighter_test_data";

const { fighter1, fighter2 } = fighterTestData;

describe("calculateSuccess", () => {
  it("should return a successful chance", () => {
    const success = calculateSuccess(fighter1, fighter2, "punch", () => 0.5);
    expect(success).toEqual(true);
  });

  it("should return a failed chance ", () => {
    const success = calculateSuccess(fighter1, fighter2, "punch", () => 0.1);
    expect(success).toEqual(false);
  });
});
