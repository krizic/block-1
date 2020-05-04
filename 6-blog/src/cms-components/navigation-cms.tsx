import * as React from "react";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faTwitterSquare,
  faInstagramSquare,
  faPinterestSquare,
} from "@fortawesome/free-brands-svg-icons";

import {INavigationComponent} from "../api/interface/navigation-component";

export interface INavigationCmsProps extends INavigationComponent {}

export default class NavigationCms extends React.PureComponent<
  INavigationCmsProps
> {
  readonly fonts = {
    faFacebookSquare,
    faTwitterSquare,
    faInstagramSquare,
    faPinterestSquare,
  };

  public render() {
    return (
      <div className="navigation-cms">
        {this.props.links.map((current) => {
          return (
            <div className="icon-item">
              <a href={current.url}>
                <FontAwesomeIcon icon={this.fonts[current.icon]} />
              </a>
            </div>
          );
        })}
      </div>
    );
  }
}
