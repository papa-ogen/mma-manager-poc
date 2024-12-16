import { describe, expect, it } from "vitest";
import {
  calculateSuccess,
  getPunchAction,
  getDamage,
} from "../actions/punchFactory";
import { fighterTestData } from "./fighter_test_data";

const { fighter1, fighter2 } = fighterTestData;

describe("punchFactory", () => {
  it("should return a punch action", () => {
    const action = getPunchAction(() => 0.1);
    expect(action).toEqual("jab");
  });
  it("should return a punch action", () => {
    const action = getPunchAction(() => 0.2);
    expect(action).toEqual("cross");
  });
  it("should return a punch action", () => {
    const action = getPunchAction(() => 0.3);
    expect(action).toEqual("hook");
  });
  it("should return a punch action", () => {
    const action = getPunchAction(() => 0.5);
    expect(action).toEqual("uppercut");
  });
  it("should return a punch action", () => {
    const action = getPunchAction(() => 0.6);
    expect(action).toEqual("overhand");
  });
  it("should return a punch action", () => {
    const action = getPunchAction(() => 0.8);
    expect(action).toEqual("backfist");
  });
  it("should return a punch action", () => {
    const action = getPunchAction(() => 0.9);
    expect(action).toEqual("superman punch");
  });

  it("should return a success chance", () => {
    const success = calculateSuccess(fighter1, fighter2, "punch", () => 0.5);
    expect(success).toEqual(true);
  });

  it("should return a damage value", () => {
    const damage = getDamage(fighter1, "jab", () => 0.1);
    expect(damage).toEqual(12);
  });
  it("should return a damage value", () => {
    const damage = getDamage(fighter1, "jab", () => 0.9);
    expect(damage).toEqual(40);
  });
  it("should return a damage value", () => {
    const damage = getDamage(fighter1, "cross", () => 0.1);
    expect(damage).toEqual(13);
  });
  it("should return a damage value", () => {
    const damage = getDamage(fighter1, "cross", () => 0.9);
    expect(damage).toEqual(41);
  });
  it("should return a damage value", () => {
    const damage = getDamage(fighter1, "hook", () => 0.1);
    expect(damage).toEqual(14);
  });
  it("should return a damage value", () => {
    const damage = getDamage(fighter1, "hook", () => 0.9);
    expect(damage).toEqual(42);
  });
  it("should return a damage value", () => {
    const damage = getDamage(fighter1, "uppercut", () => 0.9);
    expect(damage).toEqual(43);
  });
  it("should return a damage value", () => {
    const damage = getDamage(fighter1, "overhand", () => 0.9);
    expect(damage).toEqual(44);
  });
  it("should return a damage value", () => {
    const damage = getDamage(fighter1, "backfist", () => 0.9);
    expect(damage).toEqual(45);
  });
  it("should return a damage value", () => {
    const damage = getDamage(fighter1, "superman punch", () => 0.9);
    expect(damage).toEqual(46);
  });
});
