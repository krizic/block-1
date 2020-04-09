import * as React from "react";
import "./developer.scss";
import {
  Segment,
  Form,
  Button,
  Dropdown,
  Divider,
  DropdownProps,
} from "semantic-ui-react";
import { IUserInfo, LocalUserInfoApi } from '../services';
import {v4 as uuid} from "uuid";

export interface IDeveloperPageProps {}

export interface IDeveloperPageState {
  userInfoForm: IUserInfo;
  userInfo?: IUserInfo;
}

export default class DeveloperPage extends React.Component<
  IDeveloperPageProps,
  IDeveloperPageState
> {
  constructor(props: IDeveloperPageProps) {
    super(props);

    this.state = {
      userInfoForm: {},
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
    LocalUserInfoApi.saveSession(userInfo);
    this.setState({
      userInfo
    });
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

    const userInfoFormTemplate = <Segment.Group raised className="form-wrapper">
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
  </Segment.Group>;

    return (
      <div className="developer-page">
        {
          this.state.userInfo ? (<div>Signed in</div>) : userInfoFormTemplate
        }
      </div>
    );
  }
}
