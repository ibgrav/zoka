import { sequence } from "astro:middleware";
import { sessionMiddleware } from "./session";
import { apiMiddleware } from "./api";

export const onRequest = sequence(sessionMiddleware, apiMiddleware);
