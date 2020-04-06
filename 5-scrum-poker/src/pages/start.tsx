import * as React from "react";
import {Button, Form, Card} from "semantic-ui-react";
import {withRouter, RouteComponentProps} from "react-router-dom";

import {ApiService} from "../api";
import "./start.scss";


export interface IStartProps extends RouteComponentProps {}

export interface IStartState {
  form: IForm;
  valid?: IForm;
}

interface IForm {
  session_name: string;
  session_pin: string;
  [key: string]: string;
}

enum FormField {
  session_name = "session_name",
  session_pin = "session_pin"
}

class Start extends React.Component<IStartProps, IStartState> {
  api: ApiService = ApiService.Instance;

  state: IStartState = {
    form: {
      session_name: "",
      session_pin: "",
    },
  };

  componentDidMount() {
    this.api.info().then((data) => {
      console.log("info", data);
    });
  }

  onFormSubmit = (formData: IForm) => {
    this.setState({
      valid: Object.keys(formData).reduce((next: any, current) => {
        next[current] = formData[current] !== "" ? "valid" : "invalid";
        return next;
      }, {}) as IForm
    });
    if (formData.session_name !== "" && formData.session_pin !== "") {
      this.api.post(formData).then((response) => {
        if(response.ok) {
          this.props.history.push(`/po-page?id=${response.id}`);
        }
      });
    } 
  };

  onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const form = {
      ...this.state.form,
      ...{[event.currentTarget.name]: event.currentTarget.value},
    };

    this.setState({form});
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
              <Form
                onSubmit={(e) => {
                  this.onFormSubmit(this.state.form);
                }}
              >
                <Form.Field>
                  <Form.Input
                    name={FormField.session_name}
                    value={this.state.form.session_name}
                    label="Session Name"
                    onChange={this.onInputChange}
                    className={this.state.valid?.session_name}
                  />
                </Form.Field>
                <Form.Field>
                  <Form.Input
                    name={FormField.session_pin}
                    value={this.state.form.session_pin}
                    label="Session PIN"
                    onChange={this.onInputChange}
                    className={this.state.valid?.session_pin}
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

export default withRouter(Start);
