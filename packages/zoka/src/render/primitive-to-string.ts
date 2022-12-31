import { isBoolean, isNumber, isString } from "../is";

export let primitiveToString = (value: unknown, fallback: () => string): string => {
  if (isString(value)) return value;
  if (isNumber(value)) return value + "";

  if (!value || isBoolean(value)) return "";

  return fallback();
};
