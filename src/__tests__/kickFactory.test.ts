import { describe, expect, it } from "vitest";
import { getKickAction, getDamage } from "../actions/kickFactory";
import { fighterTestData } from "./fighter_test_data";

const { fighter1 } = fighterTestData;

describe("kickFactory", () => {
  it("should return a kick action", () => {
    const action = getKickAction(() => 0.1);
    expect(action).toEqual("roundhouse");
  });
  it("should return a kick action", () => {
    const action = getKickAction(() => 0.2);
    expect(action).toEqual("side");
  });
  it("should return a kick action", () => {
    const action = getKickAction(() => 0.3);
    expect(action).toEqual("back");
  });
  it("should return a kick action", () => {
    const action = getKickAction(() => 0.5);
    expect(action).toEqual("axe");
  });
  it("should return a kick action", () => {
    const action = getKickAction(() => 0.6);
    expect(action).toEqual("spinning");
  });
  it("should return a kick action", () => {
    const action = getKickAction(() => 0.8);
    expect(action).toEqual("oblique");
  });
  it("should return a kick action", () => {
    const action = getKickAction(() => 0.9);
    expect(action).toEqual("flying");
  });

  it("should return a damage value", () => {
    const damage = getDamage(fighter1, "front", () => 0.1);
    expect(damage).toEqual(12);
  });
  it("should return a damage value", () => {
    const damage = getDamage(fighter1, "front", () => 0.9);
    expect(damage).toEqual(40);
  });
  it("should return a damage value", () => {
    const damage = getDamage(fighter1, "roundhouse", () => 0.1);
    expect(damage).toEqual(14);
  });
  it("should return a damage value", () => {
    const damage = getDamage(fighter1, "roundhouse", () => 0.9);
    expect(damage).toEqual(42);
  });
  it("should return a damage value", () => {
    const damage = getDamage(fighter1, "side", () => 0.1);
    expect(damage).toEqual(13);
  });
  it("should return a damage value", () => {
    const damage = getDamage(fighter1, "side", () => 0.9);
    expect(damage).toEqual(41);
  });
});
