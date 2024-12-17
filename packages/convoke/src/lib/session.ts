import { JWT_SECRET } from "astro:env/server";
import { EncryptJWT, base64url, jwtDecrypt } from "jose";
import type { Session } from "../types/schema";

const secret = base64url.decode(JWT_SECRET);

const issuer = "zoka";
const audience = "editor";

export async function getEncryptedSession(session: string): Promise<Session> {
  const response = await jwtDecrypt<Session>(session, secret, {
    issuer,
    audience,
  });

  return {
    token: response.payload.token,
  };
}

export function createEncrypedSession(session: Session) {
  return new EncryptJWT(session)
    .setProtectedHeader({ alg: "dir", enc: "A128CBC-HS256" })
    .setIssuedAt()
    .setIssuer(issuer)
    .setAudience(audience)
    .setExpirationTime("8h")
    .encrypt(secret);
}
