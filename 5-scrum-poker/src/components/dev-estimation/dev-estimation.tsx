import * as React from "react";
import {ApiService} from "../../api";

export interface IDevEstimationProps {
  sessionId: string;
}

export interface IDevEstimationState {
  activeEstimationId?: string;
}

export default class DevEstimation extends React.Component<
  IDevEstimationProps,
  IDevEstimationState
> {
  readonly api: ApiService = ApiService.Instance;

  state: IDevEstimationState = {};

  componentDidMount() {
    this.setActiveEstimation();
    this.api.onChange(this.onEstimationChange);
  }

  setActiveEstimation() {
    this.api.getSession(this.props.sessionId).then((result) => {
      const activeEstimationId = Object.keys(result.estimations!).reduce(
        (acc, current) => {
          const currentEstimation = result.estimations![current];
          acc = currentEstimation.isActive ? currentEstimation.id : acc;
          return acc;
        },
        ""
      );

      this.setState({activeEstimationId});
    });
  }

  onEstimationChange = () => {
    this.setActiveEstimation();
  };

  public render() {
    return <div>{this.state.activeEstimationId || "NO Estimation Active"}</div>;
  }
}
