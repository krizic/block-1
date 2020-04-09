export interface IUserInfo {
  id?: string;
  username?: string;
  email?: string;
  pattern?: string;
}

const userInfoKey = "sp_user";

export class LocalUserInfoApi {
  static saveSession(userInfo: IUserInfo) {
    localStorage.setItem(userInfoKey, JSON.stringify(userInfo));
  }

  static getSession(): IUserInfo | null {
    const userInfoValue = localStorage.getItem(userInfoKey);

    if (userInfoValue) {
      return JSON.parse(userInfoKey);
    }

    return null;
  }
}
