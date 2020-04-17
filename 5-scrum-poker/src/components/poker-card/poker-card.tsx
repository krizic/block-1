import * as React from "react";
import Gravatar from "react-gravatar";

import style from "./style.module.scss";
import "./index.scss";
import {Dimmer, Loader} from "semantic-ui-react";

export interface IPokerCardProps {
  voteValue: string;
  voter: string;
  side: "front" | "back";
  withProfilePic?: boolean;
  onSelect?: (value: string) => any
}

export interface IPokerCardState {}

export default class PokerCard extends React.Component<
  IPokerCardProps,
  IPokerCardState
> {
  constructor(props: IPokerCardProps) {
    super(props);
    this.state = {};
  }

  onSelect = () => {
    this.props.onSelect(this.props.voteValue);
  }

  public render() {
    const side =
      this.props.side === "front" ? (
        // front
        <div className={style.componentFront} onClick={this.onSelect}>
          <div className={style.faceFront}>
            <div className={style.content}>
              <div className={style.valueFront}>{this.props.voteValue}</div>
              {this.props.withProfilePic && (
                <div className={style.labelFront}>
                  <Gravatar
                    size={80}
                    className={style.avatar}
                    email="vedran@krizic.net"
                  />
                  <div>Vedran</div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        // back
        <div className={style.componentBack} onClick={this.onSelect}>
          <div className={style.faceBack}>
            <div className={style.content}>
              {this.props.withProfilePic && (
                <div className={style.labelFront}>
                  <Gravatar
                    size={80}
                    className={style.avatar}
                    email="vedran@krizic.net"
                  />
                  <div className={style.voterLabel}>Vedran</div>
                </div>
              )}
              <Dimmer active>
                {this.props.withProfilePic && (
                  <Gravatar
                    size={80}
                    className={style.avatar}
                    email="vedran@krizic.net"
                  />
                )}
                <div className={style.voterLabel}>Vedran</div>
                <Loader active className="fit" />
              </Dimmer>
            </div>
          </div>
        </div>
      );

    return side;
  }
}
