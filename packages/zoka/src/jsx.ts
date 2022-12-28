export {};

declare global {
  namespace JSX {
    type Primitive = string | number | boolean | null | undefined;

    type Children = Primitive | Element | Array<Primitive | Element | Children>;

    type Type = string | Component<unknown>;

    type Attribute = Primitive | Array<Primitive | Attribute> | Record<string, Primitive>;

    interface InherentProps {
      children?: Children;
      className?: Attribute;
    }

    type Props<P> = P & InherentProps;

    type Component<P> = (props: Props<P>) => Element | Promise<Element>;

    interface Element {
      type: Type;
      props: Props<unknown>;
    }

    interface IntrinsicElements {
      [key: string]: Props<Record<string, string>>;
    }
  }
}
