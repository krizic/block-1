import * as React from "react";
import {ApiService} from "../../api";
import {IEstimation} from "../../api/interfaces";
import {Segment, Card} from "semantic-ui-react";

export interface IDevEstimationProps {
  sessionId: string;
}

export interface IDevEstimationState {
  activeEstimation?: IEstimation;
  sessionName?: string;
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
      const activeEstimation: IEstimation | undefined = Object.keys(
        result.estimations!
      ).reduce((acc, current) => {
        const currentEstimation = result.estimations![current];
        acc = currentEstimation.isActive ? currentEstimation : acc;
        return acc;
      }, undefined as IEstimation | undefined);

      this.setState({activeEstimation, sessionName: result.session_name});
    });
  }

  onEstimationChange = () => {
    this.setActiveEstimation();
  };

  public render() {
    return (
      <>
        <Segment.Group>
          <Segment secondary>Session: {this.state.sessionName}</Segment>

          {!this.state.activeEstimation && (
            <Segment padded="very" textAlign="center">
              No Active Estimation.
            </Segment>
          )}
        </Segment.Group>
        {this.state.activeEstimation && (
          <Card.Group>
            <Card>
              <Card.Content>
                <Card.Header>
                  Estimation Name: {this.state.activeEstimation.name}
                </Card.Header>
                <Card.Description>
                  Estimation Description{" "}
                  {this.state.activeEstimation.description}
                </Card.Description>
                <Card.Meta>
                  <div>rest</div>
                </Card.Meta>
                
              </Card.Content>
            </Card>
          </Card.Group>
        )}
      </>
    );
  }
}
