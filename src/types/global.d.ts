export {};

declare global {
  interface Cookies {
    accessToken?: string;
    networkName?: string;
    memberToken?: string;
  }
}
