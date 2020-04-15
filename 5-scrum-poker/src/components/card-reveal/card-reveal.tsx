import * as React from "react";
import {Reveal} from "semantic-ui-react";
import PokerCard from "../poker-card/poker-card";

import style from "./style.module.scss";

export interface ICardRevealProps {
  shouldHide: boolean;
}

export default class CardReveal extends React.Component<ICardRevealProps> {
  public render() {
    return (
      <Reveal
        disabled={this.props.shouldHide}
        active={!this.props.shouldHide}
        animated="move"
        style={{pointerEvents: "none"}}
        className={style.container}
      >
        <Reveal.Content style={{lineHeight:0}} visible>
          <PokerCard side="back" voter="" voteValue=""></PokerCard>
        </Reveal.Content>
        <Reveal.Content style={{lineHeight:0}} hidden>
          <PokerCard side="front" voter="Vedran" voteValue="40"></PokerCard>
        </Reveal.Content>
      </Reveal>
    );
  }
}
