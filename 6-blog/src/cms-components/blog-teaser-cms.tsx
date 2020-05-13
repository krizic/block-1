import * as React from 'react';
import { ImageObject } from "../api/interface/image";

import { Item } from "semantic-ui-react";
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
      <Item.Group className="blog-teasers">
        <Item>         
          <Item.Image size="medium" src={`${env.apiUrl}${this.props.image.url}`} />
          <Item.Content>
            <Item.Header>{this.props.title}</Item.Header>
            <Item.Meta>
              <span className='date'>{this.props.date}</span>
            </Item.Meta>
            <Item.Description>
              {this.props.teaser}
            </Item.Description>
          </Item.Content>
          <Item.Content extra>
            {this.props.author}
          </Item.Content>
        </Item>
        </Item.Group>
    );
  }
}
