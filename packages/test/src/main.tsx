import { renderToElements } from "zoka";
import { App } from "./App";

const root = document.getElementById("root")!;

renderToElements(document, root, <App />);
