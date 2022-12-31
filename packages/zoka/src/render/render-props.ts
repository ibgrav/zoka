import { isArray, isBoolean, isNumber, isObject, isString } from "../is";

export function renderProps(value: unknown): string {
  if (isString(value)) return value;
  if (isNumber(value)) return value + "";

  if (!value || isBoolean(value)) return "";

  if (isArray(value)) return value.map(renderProps).join(" ");

  if (isObject(value)) {
    for (const [key, val] of Object.entries(value)) {
    }
  }

  return "";
}
