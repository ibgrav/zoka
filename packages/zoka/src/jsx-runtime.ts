export const IS_ELEMENT = Symbol("element");

export function jsx(type: JSX.Type, props: JSX.Props<unknown>): JSX.Element {
  return [IS_ELEMENT, type, props];
}

export const jsxs = jsx;
export const jsxDev = jsx;
export const jsxDEV = jsx;

export function Fragment(props: JSX.InherentProps) {
  return props?.children;
}

export function createElement(type: JSX.Type, props: JSX.Props<unknown>, ...children: JSX.Children[]) {
  if (children.length > 0) {
    if (props.children !== undefined) props.children = [props.children, ...children];
    else props.children = children;
  }

  return jsx(type, props);
}
