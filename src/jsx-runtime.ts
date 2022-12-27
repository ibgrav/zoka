export function jsx(type: JSX.Type, props: JSX.Props<unknown>): JSX.Element {
  return { type, props };
}

export const jsxs = jsx;
export const jsxDev = jsx;

export function Fragment(props: JSX.InherentProps) {
  return props?.children;
}

export function createElement(type: JSX.Type, props: JSX.Props<unknown>, ...children: JSX.Children[]) {
  if (props?.children) {
    if (Array.isArray(props.children)) children.push(...props.children);
    else children.push(props.children);
  }

  return jsx(type, { ...props, children: children as JSX.Children });
}
