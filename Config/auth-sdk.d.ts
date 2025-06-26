// TypeScript definitions for Auth SDK
declare namespace AuthSDK {
  interface Tokens {
    access: string;
    refresh: string;
    [key: string]: any;
  }
  interface Config {
    apiBase?: string;
    useCookies?: boolean;
    storageKey?: string;
    refreshEndpoint?: string;
    loginEndpoint?: string;
    logoutEndpoint?: string;
    csrfEndpoint?: string;
    tokenStatusEndpoint?: string;
    onAuthEvent?: (event: string, data?: any) => void;
  }
  function setConfig(config: Config): void;
  function login(email: string, password: string): Promise<Tokens>;
  function logout(): Promise<void>;
  function refresh(): Promise<Tokens>;
  function getCSRFToken(): Promise<string>;
  function authFetch(input: RequestInfo, init?: RequestInit): Promise<Response>;
  function getTokens(): Tokens | null;
  function setTokens(tokens: Tokens): void;
  function clearTokens(): void;
  const config: Config;
}
declare const AuthSDK: typeof AuthSDK;
export = AuthSDK;
