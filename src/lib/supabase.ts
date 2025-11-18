import { createServerClient, parseCookieHeader, serializeCookieHeader } from "@supabase/ssr";
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from "astro:env/server";

type Cookie = { name: string; value: string };

export function createSupabase(reqHeaders: Headers, resHeaders: Headers) {
  return createServerClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY!, {
    cookies: {
      getAll() {
        return parseCookieHeader(reqHeaders.get("Cookie") ?? "").filter((cookie) => cookie.value) as Cookie[];
      },
      setAll(cookiesToSet) {
        for (const { name, value, options } of cookiesToSet) {
          resHeaders.append("Set-Cookie", serializeCookieHeader(name, value, options));
        }
      }
    }
  });
}
