export class ZDOMDucument {
  public createElement(tagName: string) {
    return new ZDOMElement(tagName);
  }
}

export class ZDOMElement {
  public innerText = "";
  public children: Array<ZDOMElement> = [];
  public attributes: Record<string, string> = {};

  constructor(public tagName: string) {}

  public setAttribute(key: string, value: string) {
    this.attributes[key] = value;
  }

  public appendChild(el: ZDOMElement) {
    this.children.push(el);
  }
}
