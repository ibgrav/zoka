import { isElement, isFunction, isString, isVoidTag } from "../is";
import { primitiveToString } from "./primitive-to-string";

export let renderToString = (value: unknown): string => {
  return primitiveToString(value, () => {
    if (isElement(value)) {
      let [, type, props] = value;

      if (isFunction<JSX.Component<unknown>>(type)) {
        return renderToString(type(props));
      }

      if (isString(type)) {
        let attrs = renderToString({ ...props, children: undefined });
        let children = renderToString(props.children);

        if (isVoidTag(type)) {
          return `<${type}${attrs} />`;
        }

        return `<${type}${attrs}>${children}</${type}>`;
      }
    }

    if (Array.isArray(value)) {
      return value.map(renderToString).join("");
    }

    return "";
  });
};
