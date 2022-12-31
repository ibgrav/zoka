import { renderToString } from "zoka";
import { App } from "./App";

import "./main.css";

const root = document.getElementById("root")!;

const result = renderToString(<App />);

root.innerHTML = result;
