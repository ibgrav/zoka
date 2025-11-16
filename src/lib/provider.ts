import type { Tokens } from "~/lib/schema";

interface OauthTokenResponse {
  access_token: string;
  refresh_token: string;
  error?: string;
  error_description?: string;
}

interface ProviderOptions {
  name: string;
  base: string;
  scope: string;
  clientId: string;
  clientSecret: string;
}

export class Provider<T = null> {
  name: string;
  base: string;
  scope: string;
  clientId: string;
  clientSecret: string;

  constructor({ name, base, clientId, clientSecret, scope }: ProviderOptions) {
    this.name = name;
    this.base = base;
    this.scope = scope;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }

  async getMetadata(_tokens: Tokens): Promise<T> {
    return null as T;
  }

  getRedirectUri(url: URL): URL {
    return new URL(`/auth/${this.name}/callback`, url.origin);
  }

  getLoginUrl(url: URL, state: string): URL {
    const login = new URL("/oauth/authorize", this.base);

    login.searchParams.set("redirect_uri", this.getRedirectUri(url).href);
    login.searchParams.set("client_id", this.clientId);
    login.searchParams.set("response_type", "code");
    login.searchParams.set("scope", this.scope);
    login.searchParams.set("state", state);

    if (this.name === "storyblok" && import.meta.env.DEV) {
      login.searchParams.set("dev", "1"); // storyblok dev mode
    }

    return login;
  }

  async onCallback(url: URL, code: string): Promise<Tokens> {
    return await this.getTokens(
      new URLSearchParams([
        ["grant_type", "authorization_code"],
        ["code", code],
        ["client_id", this.clientId],
        ["client_secret", this.clientSecret],
        ["redirect_uri", this.getRedirectUri(url).href]
      ])
    );
  }

  async onRefresh(refresh_token: string): Promise<Tokens> {
    return await this.getTokens(
      new URLSearchParams([
        ["grant_type", "refresh_token"],
        ["refresh_token", refresh_token],
        ["client_id", this.clientId],
        ["client_secret", this.clientSecret]
      ])
    );
  }

  async getTokens(body: URLSearchParams): Promise<Tokens> {
    const res = await fetch(new URL("/oauth/token", this.base), {
      body,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    const data = (await res.json()) as OauthTokenResponse;

    if (data.error) {
      throw new Error(data.error_description ?? data.error);
    }

    return {
      access_token: data.access_token,
      refresh_token: data.refresh_token
    };
  }
}
