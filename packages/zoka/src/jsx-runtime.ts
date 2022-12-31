export let IS_ELEMENT = Symbol("element");

export let jsx = (type: JSX.Type, props: JSX.Props<unknown>): JSX.Element => {
  return [IS_ELEMENT, type, props];
};

export let jsxs = jsx;
export let jsxDev = jsx;
export let jsxDEV = jsx;

export let Fragment = (props: JSX.InherentProps) => {
  return props?.children;
};

export let createElement = (type: JSX.Type, props: JSX.Props<unknown>, ...children: JSX.Children[]) => {
  if (children.length > 0) {
    if (props.children !== undefined) props.children = [props.children, ...children];
    else props.children = children;
  }

  return jsx(type, props);
};
