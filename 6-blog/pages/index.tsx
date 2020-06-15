import * as React from "react";

export interface IIndexProps {}

export default class Index extends React.PureComponent<IIndexProps> {
  static getInitialProps = ({res}) => {
    if (res) {
      res.writeHead(301, {
        Location: "/home",
      });
      res.end();
    }

    return {};
  };

  public render() {
    return null;
  }
}
