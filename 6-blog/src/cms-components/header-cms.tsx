import * as React from 'react';
import { Background } from '../api/interface/page';
import { url } from 'inspector';
import { env } from '../environments/dev';

export interface IHeaderCMSProps {
  title: string;
  background: Background;
}

export interface IHeaderCMSInternalProps extends IHeaderCMSProps {

}

export default class HeaderCMS extends React.PureComponent<IHeaderCMSInternalProps> {
  public render() {
    return (
      <div className="header-cms" style={{backgroundImage: `url(${env.apiUrl}${this.props.background.url})`}}>
        <h1>{this.props.title}</h1>
      </div>
    );
  }
}
