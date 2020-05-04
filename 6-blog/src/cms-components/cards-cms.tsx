import * as React from "react";
import {ICardItem} from "../api/interface/cards-component";

export interface ICardsCMSProps {
  description: string;
  items: ICardItem[];
}

export interface ICardsCMSState {}

export default class CardsCMS extends React.Component<
  ICardsCMSProps,
  ICardsCMSState
> {
  constructor(props: ICardsCMSProps) {
    super(props);

    this.state = {};
  }

  public render() {
    const components: React.ReactElement[] = this.props.items.map((item) => {
      return <div>{item.alt}</div>;
    });
    return <>{components}</>;
  }
}
