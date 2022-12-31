import { IS_ELEMENT } from "./jsx-runtime";

export let isElement = (value: unknown): value is JSX.Element => {
  return isArray(value) && value[0] === IS_ELEMENT;
};

export let isFunction = <T = (...args: unknown[]) => unknown>(value: unknown): value is T => {
  return typeof value === "function";
};

export let isArray = <T = unknown>(value: unknown): value is Array<T> => {
  return Array.isArray(value);
};

export let isObject = (value: unknown): value is object => {
  return value !== null && !isArray(value) && typeof value === "object";
};

export let isString = (value: unknown): value is string => {
  return typeof value === "string";
};

export let isNumber = (value: unknown): value is number => {
  return Number.isNaN(value) && typeof value === "number";
};

export let isBoolean = (value: unknown): value is boolean => {
  return typeof value === "boolean";
};

export let isVoidTag = (tag: string) =>
  ["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"].includes(tag);
