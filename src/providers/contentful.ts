import type { Provider, TokenResponse } from "~/lib/provider";

interface OauthTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  error?: string;
  error_description?: string;
}

export class ContentfulProvider implements Provider {
  base = "https://be.contentful.com";

  clientId: string;
  clientSecret: string;

  constructor(clientId: string, clientSecret: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }

  getLoginUrl(state: string, redirectUri: URL): URL {
    const url = new URL("/oauth/authorize", this.base);
    url.searchParams.set("redirect_uri", redirectUri.href);
    url.searchParams.set("client_id", this.clientId);
    url.searchParams.set("response_type", "code");
    url.searchParams.set("scope", "content_management_manage");
    url.searchParams.set("state", state);
    return url;
  }

  async onCallback(code: string, redirectUri: URL): Promise<TokenResponse> {
    return this.oauth(
      new URLSearchParams([
        ["grant_type", "authorization_code"],
        ["code", code],
        ["client_id", this.clientId],
        ["client_secret", this.clientSecret],
        ["redirect_uri", redirectUri.href]
      ])
    );
  }

  async onRefresh(refresh_token: string): Promise<TokenResponse> {
    return this.oauth(
      new URLSearchParams([
        ["grant_type", "refresh_token"],
        ["refresh_token", refresh_token],
        ["client_id", this.clientId],
        ["client_secret", this.clientSecret]
      ])
    );
  }

  async oauth(body: URLSearchParams): Promise<TokenResponse> {
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
      expires_in: data.expires_in,
      access_token: data.access_token,
      refresh_token: data.refresh_token
    };
  }
}
