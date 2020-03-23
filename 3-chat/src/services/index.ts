import {UsernameStorageKey} from "../constants";

export class AuthService {
  static getUser(): string {
    return localStorage.getItem(UsernameStorageKey);
  }
  static isUserKnown(): boolean {
    return localStorage.getItem(UsernameStorageKey) ? true : false;
  }

  static setUser(username: string): void{
      localStorage.setItem(UsernameStorageKey, username);
  }
}
