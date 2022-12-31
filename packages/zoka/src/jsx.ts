export {};

declare global {
  namespace JSX {
    type Primitive = string | number | boolean | null | undefined;

    type Children = Primitive | Element | Array<Children>;

    type Type = string | Component<unknown>;

    type Attribute = Primitive | Array<Primitive | Attribute> | Record<string, Primitive>;

    interface InherentProps {
      children?: Children;
      className?: Attribute;
    }

    type Props<P> = P & InherentProps;

    type Component<P> = (props: Props<P>) => Element;

    type Element = [Symbol, Type, Props<unknown>];

    interface IntrinsicElements {
      [key: string]: Props<Record<string, Attribute>>;
    }
  }
}
