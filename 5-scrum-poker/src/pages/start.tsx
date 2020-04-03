import * as React from 'react';
import { Button } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'

export interface IStartProps {
}

export default class Start extends React.Component<IStartProps> {
  public render() {
    return (
      <div>
        <Button content="Start NOW!" primary ></Button>
      </div>
    );
  }
}
