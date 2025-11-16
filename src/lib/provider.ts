export interface TokenResponse {
  expires_in: number;
  access_token: string;
  refresh_token: string;
}

export interface Provider {
  getLoginUrl: (state: string, redirectUri: URL) => URL;
  onCallback: (code: string, redirectUri: URL) => Promise<TokenResponse>;
  onRefresh: (refresh_token: string) => Promise<TokenResponse>;
}
