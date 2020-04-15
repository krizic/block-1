import * as React from "react";
import "./developer.scss";
import {IUserInfo, LocalUserInfoApi} from "../services";
import DevSignIn from "../components/dev-sign-in/dev-sign-in";
import DevEstimation from '../components/dev-estimation/dev-estimation';

export interface IDeveloperPageProps {}

export interface IDeveloperPageState {
  userInfo?: IUserInfo;
}

export default class DeveloperPage extends React.Component<
  IDeveloperPageProps,
  IDeveloperPageState
> {

  currentSession: string = "115f133d-2f68-4ef1-8966-1faff762f5f2";

  state: IDeveloperPageState = {userInfo: LocalUserInfoApi.getUserInfo() || undefined};

  onUserSignIn = (userInfo: IUserInfo) => {
    this.setState({userInfo});
  };

  public render() {
    return (
      <div className="developer-page">
        {this.state.userInfo ? (
          <DevEstimation  sessionId= {this.currentSession} ></DevEstimation>
        ) : (
          <DevSignIn onUserSign={this.onUserSignIn}></DevSignIn>
        )}
      </div>
    );
  }
}
