import * as React from 'react';
import { ImageObject } from "../api/interface/image";
import { Card } from "semantic-ui-react";
import {env} from "../environments/dev";

export interface IBlogTeaserProps {
    title: string;
    date: string;
    author: string;
    teaser: string;
    image: ImageObject;
}

export interface IBlogTeaserState {
}

export default class BlogTeaser extends React.Component<IBlogTeaserProps, IBlogTeaserState> {
  constructor(props: IBlogTeaserProps) {
    super(props);

    this.state = {
    }
  }

  public render() {
    return (
        <Card>
            <img src={`${env.apiUrl}${this.props.image.url}`} />
            <Card.Content>
            <Card.Header> {this.props.title}</Card.Header>
            <Card.Meta>
                <span className='date'>{this.props.date}</span>
            </Card.Meta>
            <Card.Description>
                    {this.props.teaser}
            </Card.Description>
            </Card.Content>
            <Card.Content extra>
                {this.props.author}
            </Card.Content>
        </Card>
    );
  }
}
