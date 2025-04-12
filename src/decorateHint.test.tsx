import { describe, it, expect } from "vitest";
import { Card, decorateHint } from "./decorateHint";
import { render } from "@testing-library/react";

describe("decorateHint", () => {
  it("should return an empty fragment when hint is not provided", () => {
    const card: Card = { front: "she savored" };
    const { container } = render(decorateHint(card));
    expect(container.innerHTML).toBe("");
  });

  it("should decorate <b>front</b> within hint in case of front is mentioned in hint", () => {
    const card: Card = {
      front: "she savored",
      hint: "she savored her few hours of freedom and solitude",
    };
    const expected = "<b>she savored</b> her few hours of freedom and solitude";
    const { container } = render(decorateHint(card));
    expect(container.innerHTML).toBe(expected);
  });

  it("should decorate <b>front</b> within hint in case of front starts with 'the ' and is mentioned in hint", () => {
    const card: Card = {
      front: "the sedition",
      hint: "He was captured for sedition.",
    };
    const expected = "He was captured for <b>sedition</b>.";
    const { container } = render(decorateHint(card));
    expect(container.innerHTML).toBe(expected);
  });

  it("should decorate <b>front</b> within hint in case of front starts with 'to ' is mentioned in hint", () => {
    const card: Card = {
      front: "To vex",
      hint: "What vex you the most",
    };
    const expected = "What <b>vex</b> you the most";
    const { container } = render(decorateHint(card));
    expect(container.innerHTML).toBe(expected);
  });

  it("should decorate <b>the front</b> within hint in case of front is mentioned in hint and hint contains also 'the' before front.", () => {
    const card: Card = {
      front: "sprinkler",
      hint: "I left the sprinkler on in the backyard.",
    };
    const expected = "I left <b>the sprinkler</b> on in the backyard.";
    const { container } = render(decorateHint(card));
    expect(container.innerHTML).toBe(expected);
  });

  it("should decorate return just hint as fragment if front is not contained in hint.", () => {
    const card: Card = {
      front: "wrong card",
      hint: "Hint without decoration.",
    };
    const expected = "Hint without decoration.";
    const { container } = render(decorateHint(card));
    expect(container.innerHTML).toBe(expected);
  });

  it("should decorate front even in case the word only starts with front in hint.", () => {
    const card: Card = {
      front: "Drain",
      hint: "we drained the swimming pool",
    };
    const expected = "we <b>drained</b> the swimming pool";
    const { container } = render(decorateHint(card));
    expect(container.innerHTML).toBe(expected);
  });
});
