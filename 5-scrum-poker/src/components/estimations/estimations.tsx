import * as React from "react";
import {Tab} from "semantic-ui-react";

import {IEstimation} from "../../api/interfaces";
import VotesTable from "../votes-table/votes-table";

export interface IEstimationsProps {
  estimations: {[key: string]: IEstimation};
  rev: string;
  id: string;
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
      initialRender: false,
    };
  }

  mapEstimationsToPanes = () => {
    return Object.keys(this.props.estimations)
      .sort((a, b) => {
        return this.props.estimations[a].timestamp <
          this.props.estimations[b].timestamp
          ? 1
          : -1;
      })
      .map((estimationKeys, index) => {
        return {
          menuItem: this.props.estimations[estimationKeys].isActive
            ? `${this.props.estimations[estimationKeys].name} - Active`
            : this.props.estimations[estimationKeys].name,
          render: () => (
            <Tab.Pane red active={index === 0}>
              <VotesTable
                documentRef={{_rev: this.props.rev, _id: this.props.id}}
                estimate={this.props.estimations[estimationKeys]}
              ></VotesTable>
            </Tab.Pane>
          ),
        };
      });
  }

  public render() {
    return (
      <Tab
        menu={{fluid: true, vertical: true, tabular: "right"}}
        panes={this.mapEstimationsToPanes()}
      />
    );
  }
}