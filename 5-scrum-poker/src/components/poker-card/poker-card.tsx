import * as React from "react";

import style from "./style.module.scss";
import "./index.scss";
import Gravatar from "react-gravatar";
import {Loader, Dimmer} from "semantic-ui-react";

export interface IPokerCardProps {
  voteValue: string;
  voter: string;
  side: "front" | "back";
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

  public render() {
    const side =
      this.props.side === "front" ? (
        // front
        <div className={style.componentFront}>
          <div className={style.faceFront}>
            <div className={style.content}>
              <div className={style.valueFront}>{this.props.voteValue}</div>
              <div className={style.labelFront}>
                <Gravatar
                  size={80}
                  className={style.avatar}
                  email="vedran@krizic.net"
                />
                <div>Vedran</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // back
        <div className={style.componentBack}>
          <div className={style.faceBack}>
            <div className={style.content}>
              <div className={style.labelFront}>
                <Gravatar
                  size={80}
                  className={style.avatar}
                  email="vedran@krizic.net"
                />
                <div className={style.voterLabel}>Vedran</div>
              </div>
              {/* <Dimmer active>
                <Gravatar
                  size={80}
                  className={style.avatar}
                  email="vedran@krizic.net"
                />
                <div className={style.voterLabel}>Vedran</div>
                <Loader active className="fit" />
              </Dimmer> */}
            </div>
          </div>
        </div>
      );

    return side;
  }
}
