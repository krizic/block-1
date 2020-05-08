import * as React from "react";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faTwitterSquare,
  faInstagramSquare,
  faPinterestSquare,
} from "@fortawesome/free-brands-svg-icons";
import {Menu} from "semantic-ui-react";

import {MenuComponent} from "../component/menu-component";
import {INavigationComponent} from "../api/interface/navigation-component";
import {IMenu} from "../api/interface/menu";

export interface INavigationCmsProps extends INavigationComponent {
  menu: IMenu;
}

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
      <div>
        <div className="navigation-cms">
          <div className="social">
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
          <div className="menu">
            <MenuComponent {...this.props.menu} />
          </div>
        </div>
      </div>
    );
  }
}
