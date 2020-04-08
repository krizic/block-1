import * as React from "react";
import {Button} from "semantic-ui-react";

import "./votes-table.scss";
import {IEstimation} from "../api/interfaces";
import {ApiService} from "../api";

export interface IVotesTableProps {
  estimate: IEstimation;
  documentRef: {_id: string, _rev: string}
}

export interface IVotesTableState {}

export default class VotesTable extends React.Component<
  IVotesTableProps,
  IVotesTableState
> {
  readonly api: ApiService = ApiService.Instance;

  constructor(props: IVotesTableProps) {
    super(props);
    this.state = {};
  }

  onToggleVoteClick = (event: React.MouseEvent, active: boolean) => {
    console.log(event);

    const newEstimate: IEstimation = {...this.props.estimate, isActive: active}

    this.api.updateEstimation(this.props.documentRef, newEstimate);
  };

  public render() {
    return (
      <div className="votes-table">
        <Button.Group vertical labeled icon className="votes-table__controls">
          <Button
            icon="play"
            primary={!this.props.estimate.isActive}
            disabled={this.props.estimate.isActive}
            content="Start Vote"
            onClick={(e) => {this.onToggleVoteClick(e, true)}}
          />
          <Button
            icon="stop"
            disabled={!this.props.estimate.isActive}
            negative={this.props.estimate.isActive}
            content="Stop Vote"
            onClick={(e) => {this.onToggleVoteClick(e, false)}}
          />
          {/* <Button icon='shuffle' content='Shuffle' /> */}
        </Button.Group>
      </div>
    );
  }
}
