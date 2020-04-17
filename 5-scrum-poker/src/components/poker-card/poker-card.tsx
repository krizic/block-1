import * as React from "react";
import Gravatar from "react-gravatar";

import "./index.scss";
import {Dimmer, Loader} from "semantic-ui-react";

export interface IPokerCardProps {
  className?: string;
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
    if(this.props.onSelect) {
      this.props.onSelect(this.props.voteValue);
    }
  }

  public render() {
    const side =
      this.props.side === "front" ? (
        // front
        <div className={`componentFront ${this.props.className}`} onClick={this.onSelect}>
          <div className={"faceFront"}>
            <div className={"content"}>
              <div className={"valueFront"}>{this.props.voteValue}</div>
              {this.props.withProfilePic && (
                <div className={"labelFront"}>
                  <Gravatar
                    size={80}
                    className={"avatar"}
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
        <div className={`componentBack ${this.props.className}`} onClick={this.onSelect}>
          <div className={"faceBack"}>
            <div className={"content"}>
              {this.props.withProfilePic && (
                <div className={"labelFront"}>
                  <Gravatar
                    size={80}
                    className={"avatar"}
                    email="vedran@krizic.net"
                  />
                  <div className={"voterLabel"}>Vedran</div>
                </div>
              )}
              <Dimmer active>
                {this.props.withProfilePic && (
                  <Gravatar
                    size={80}
                    className={"avatar"}
                    email="vedran@krizic.net"
                  />
                )}
                <div className={"voterLabel"}>Vedran</div>
                <Loader active className="fit" />
              </Dimmer>
            </div>
          </div>
        </div>
      );

    return side;
  }
}
