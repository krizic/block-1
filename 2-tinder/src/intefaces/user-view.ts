import { User } from "../api/models";

export interface IUserView extends User {
    liked?: boolean;
}
  