import { test, expect } from "vitest";
import { createElement } from "./jsx-runtime";

const el = <div className="test"></div>;
const obj = { type: "div", props: { className: "test" } };

test("jsx", () => {
  expect(el.type).toEqual("div");
  expect(el.props).toStrictEqual(obj.props);
});

test("Fragment", () => {
  const result = <>{el}</>;

  expect(result.type).toBeTypeOf("function");
  expect(result.props).toStrictEqual({ children: obj });
});

test("createElement", () => {
  const result = createElement("div", { className: "test" });

  expect(result.type).toEqual("div");
  expect(result.props).toStrictEqual(obj.props);
});
