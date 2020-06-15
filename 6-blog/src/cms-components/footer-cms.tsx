import * as React from 'react';

export interface IFooterCMSProps {
 text: string;
 backgroundColor: string;
 height: number;
}

export default class FooterCMS extends React.PureComponent<IFooterCMSProps> {
  public render() {
    return (
      <div className="footer-cms" style={{backgroundColor: this.props.backgroundColor, height: `${this.props.height}rem`}}>
        <h2>{this.props.text}</h2>
      </div>
    );
  }
}