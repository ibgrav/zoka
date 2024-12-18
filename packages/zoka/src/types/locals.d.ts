declare namespace App {
  interface Locals {
    api: import("./api").GitApi;
    session: import("./schema").Session;
  }
}
