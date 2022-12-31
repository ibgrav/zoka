import { primitiveToString } from "./primitive-to-string";

export let renderAttributes = (props: JSX.Props<unknown>): string => {
  let attributes = [];

  for (let [key, val] of Object.entries(props)) {
    if (key !== "children") {
      if (key === "className") key = "class";

      val = propToString(val);
      if (val) attributes.push(`${key}="${val}"`);
    }
  }

  if (attributes.length > 0) return " " + attributes.join(" ");
  return "";
};

export let propToString = (value: unknown): string => {
  return primitiveToString(value, () => {
    return "";
  });
};
