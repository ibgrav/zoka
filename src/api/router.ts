import { callback } from "~/api/routes/auth/callback";
import { login } from "~/api/routes/auth/login";

export const router = {
  auth: {
    login,
    callback
  }
};
