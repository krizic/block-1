import * as React from "react";
import {Form, Dropdown, Divider, Button, Segment, DropdownProps} from "semantic-ui-react";
import {v4 as uuid} from "uuid";

import { IUserInfo, LocalUserInfoApi } from '../../services';

export interface IDevSignInProps {
    onUserSign: (userInfo: IUserInfo) => any;
}

export interface IDevSignInState {
    userInfoForm: IUserInfo;
    userInfo?: IUserInfo;
}

export default class DevSignIn extends React.Component<
  IDevSignInProps,
  IDevSignInState
> {
  constructor(props: IDevSignInProps) {
    super(props);

    this.state = {
        userInfoForm: {}
    };
  }

  patternOptions = [
    {
      key: "1267",
      text: "Pink-Yellow",
      value: "1267",
      image: {src: "/patterns/1267.png"},
    },
    {
      key: "8126",
      text: "Red-Blue",
      value: "8126",
      image: {src: "/patterns/8126.png"},
    },
  ];

  onUserInfoFormSubmit = () => {
    const userInfo = {
        ...this.state.userInfoForm,
        id: uuid()
    }
    LocalUserInfoApi.saveUserInfo(userInfo);
    this.props.onUserSign(userInfo);
  };

  onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const userInfoForm: IUserInfo = {
      ...this.state.userInfoForm,
      ...{[event.currentTarget.name]: event.currentTarget.value},
    };
    this.setState({userInfoForm});
  };

  onSelectChange = (
    event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    const userInfoForm: IUserInfo = {
      ...this.state.userInfoForm,
      ...{pattern: data.value as string},
    };
    
    this.setState({userInfoForm});
  };

  public render() {
    return (
      <Segment.Group raised className="form-wrapper">
        <Segment secondary>User Info</Segment>
        <Segment>
          <Form onSubmit={this.onUserInfoFormSubmit}>
            <Form.Input
              required
              fluid
              value={this.state.userInfoForm.username}
              icon="user outline"
              iconPosition="left"
              placeholder="Username"
              onChange={this.onInputChange}
              name="username"
            />
            <Form.Input
              fluid
              value={this.state.userInfoForm.email}
              icon="mail outline"
              iconPosition="left"
              placeholder="Email"
              onChange={this.onInputChange}
              name="email"
            />
            <Form.Field>
              <Dropdown
                labeled={true}
                placeholder="Select Card Pattern"
                name="pattern"
                fluid
                value={this.state.userInfoForm.pattern}
                selection
                options={this.patternOptions}
                onChange={this.onSelectChange}
              />
            </Form.Field>
            <Divider />
            <Button type="submit" primary>
              Submit
            </Button>
          </Form>
        </Segment>
      </Segment.Group>
    );
  }
}
