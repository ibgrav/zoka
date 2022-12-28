import { ZDOMDucument, ZDOMElement } from "./dom";
import { IS_ELEMENT } from "./jsx-runtime";

export function render(node: unknown) {}

export function renderToElements(document: ZDOMDucument, root: ZDOMElement, element: JSX.Element) {
  console.log(element);

  if (Array.isArray(element)) {
    const [symbol, type, props] = element;

    if (symbol === IS_ELEMENT) {
      if (typeof type === "string") {
        const el = document.createElement(type);

        if (props.children) {
          if (typeof props.children === "string") el.innerText = props.children;
        }

        for (const [key, val] of Object.entries(props)) {
          if (key === "children") {
            if (typeof val === "string") el.innerText = val;
          } else if (key === "className") {
            el.setAttribute("class", val);
          } else {
            if (typeof val === "string") el.setAttribute(key, val);
          }
        }

        root.appendChild(el);
      }

      if (typeof type === "function") {
        renderToElements(document, root, type(props));
      }
    }
  }
}
