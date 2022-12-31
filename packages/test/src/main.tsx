import { render } from "zoka";
import { App } from "./App";

const root = document.getElementById("root")!;

const result = render(<App />);

root.innerHTML = result;
