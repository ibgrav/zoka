import { isArray, isElement, isFunction, isString, isVoidTag } from "../is";
import { primitiveToString } from "./primitive-to-string";
import { renderAttributes } from "./render-attributes";

export let renderToString = (value: unknown): string => {
  return primitiveToString(value, () => {
    if (isElement(value)) {
      let [, type, props] = value;

      if (isFunction<JSX.Component<unknown>>(type)) {
        return renderToString(type(props));
      }

      if (isString(type)) {
        let attributes = renderAttributes(props);

        if (isVoidTag(type)) {
          return `<${type}${attributes} />`;
        }

        let children = renderToString(props.children);

        return `<${type}${attributes}>${children}</${type}>`;
      }
    }

    if (isArray(value)) {
      return value.map(renderToString).join("");
    }

    return "";
  });
};
