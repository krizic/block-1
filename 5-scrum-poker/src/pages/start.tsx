import * as React from "react";
import {Button, Form, Card} from "semantic-ui-react";

import {ApiService} from "../api";
import "./start.scss";

export interface IStartProps {}

export interface IStartState {
  sName: string;
  sPin: string;
}

export default class Start extends React.Component<IStartProps, IStartState> {
  api: ApiService = new ApiService();

  state = {
    sName: "123",
    sPin: "",
  };

  componentDidMount() {
    this.api.info().then((data) => {
      console.log(data);
    });
  }

  onFormSubmit = (formData: any) => {
    this.api.post(this.state);
  };

  onNameChange = (event: any) => {
    this.setState({sName: event.currentTarget.value});
  };

  onPinChange = (event: any) => {
    this.setState({sPin: event.currentTarget.value});
  };

  public render() {
    return (
      <div id="start-page">
        <div className="ui input">
          <Card>
            <Card.Content>
              <Card.Header>Session Info</Card.Header>
            </Card.Content>
            <Card.Content>
              <Form onSubmit={this.onFormSubmit}>
                <Form.Field>
                  <Form.Input
                    value={this.state.sName}
                    label="Session Name"
                    onChange={this.onNameChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Form.Input
                    value={this.state.sPin}
                    label="Session PIN"
                    onChange={this.onPinChange}
                  />
                </Form.Field>
                <Button type="submit" primary>
                  Submit
                </Button>
              </Form>
            </Card.Content>
          </Card>
        </div>
      </div>
    );
  }
}
