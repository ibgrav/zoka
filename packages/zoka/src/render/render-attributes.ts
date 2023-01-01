import { isArray, isObject } from "../is";
import { primitiveToString } from "./primitive-to-string";

export let renderAttributes = (props: JSX.Props<unknown>): string => {
  let attributes: string[] = [];

  Object.entries(props).forEach(([key, val]) => {
    if (key !== "children") {
      if (key === "className") key = "class";

      val = propToString(val);
      if (val || val === 0) attributes.push(`${key}="${val}"`);
    }
  });

  if (attributes.length > 0) return " " + attributes.join(" ");
  return "";
};

export let propToString = (value: unknown): string => {
  return primitiveToString(value, () => {
    let values: string[] = [];

    if (isArray(value)) {
      value.forEach((val) => {
        let str = propToString(val);
        if (str) values.push(str);
      });
    }
    if (isObject(value)) {
      Object.entries(value).forEach(([key, val]) => {
        if (val) values.push(propToString(key));
      });
    }

    return values.join(" ");
  });
};
