declare namespace App {
  interface Locals {
    api: import("./api").API;
    session: import("./schema").Session;
  }
}
