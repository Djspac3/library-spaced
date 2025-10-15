import { describe, expect, expectTypeOf, test } from "vitest";
import { err, ok } from "./result";
import { ResultAsync } from "./result-async";

describe("test both result types", () => {
  test("check Ok type", () => {
    const current = ok("cheese");
    expect(current).toHaveProperty("value");
    expect(current.unwrap()).toBe("cheese");
    expect(current.value).toBe("cheese");
    expect(current).not.toHaveProperty("error");
  });
  test("check Err type", () => {
    const current = err("cheese");
    expect(current).toHaveProperty("error");
    expect(current).not.toHaveProperty("value");
    expect(current.unwrapErr()).toBe("cheese");
    expect(current.error).toBe("cheese");
    expect(current.unwrap).toThrowError()
    expect(current.unwrapErr()).toBe("cheese")
  });
});
