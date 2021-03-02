import * as React from "react";
import {ICardItem} from "../api/interface/cards-component";
import {env} from "../environments/dev";
import { Card } from "semantic-ui-react";

/* import BlogTeaser from "../cms-components/blog-teaser-cms";
import {IBlog} from "../api/interface/blog" */

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
      console.log(item);
      return (
          <Card style={{backgroundImage: `url(${env.apiUrl}${item.image.url})`}} href={item.page.path}>
            <div className="header">{item.alt}</div>
          </Card>

      );
    });
    return <div className="teasers">{components}</div>;
  }
}
