import * as React from "react";
import fetch from "isomorphic-fetch";
import {UsersResponse} from "../src/api/interface/user";
import {Segment} from "semantic-ui-react";

export interface IBlogProps {
  users: UsersResponse;
}

export default class Blog extends React.PureComponent<IBlogProps> {
  
    static getInitialProps(): Promise<Partial<IBlogProps>> {
    return fetch("https://randomuser.me/api/?results=200")
      .then((result) => {
        return result.json();
      })
      .then((users) => {
        return {users};
      });
  }

  public render() {
    return this.props.users.results.map((current, index, arr) => {
      return <Segment>{current.email}</Segment>;
    });
  }
}
