import * as React from "react";
import {IEstimation} from "../api/interfaces";
import {Tab} from "semantic-ui-react";

export interface IEstimationsProps {
  estimations: {[key: string]: IEstimation};
  rev: string;
}

export interface IEstimationsState {
  panes?: any;
  initialRender: boolean;
}

export default class Estimations extends React.Component<
  IEstimationsProps,
  IEstimationsState
> {
  constructor(props: IEstimationsProps) {
    super(props);

    this.state = {
        initialRender: false
    };
  }

  componentDidMount() {
   this.mapEstimationsToPanes();
  }

  componentWillUpdate(){
    this.mapEstimationsToPanes();
  }

  shouldComponentUpdate(nextProps:IEstimationsProps, nextState:IEstimationsState ){
    const shouldUpdate = (this.props.rev !== nextProps.rev) || !this.state.initialRender;

    if(!this.state.initialRender) {
        this.setState({initialRender: true});
    }

    return shouldUpdate;
  }

  mapEstimationsToPanes(){
    this.setState({
        panes: Object.keys(this.props.estimations).map((estimationKeys) => {
          return {
            menuItem: this.props.estimations[estimationKeys].name,
            render: () => <Tab.Pane>Tab 1 Content</Tab.Pane>,
          };
        }),
      });
  }

  public render() {
    return (
      <Tab
        menu={{fluid: true, vertical: true, tabular: "right"}}
        panes={this.state.panes}
      />
    );
  }
}
