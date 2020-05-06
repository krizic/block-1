import * as React from "react";
import Link from "next/link";
import { IMenu } from "../api/interface/menu";

export interface IMenuComponentProps extends IMenu {}

export class MenuComponent extends React.PureComponent<IMenuComponentProps> {
  public render() {
    return (
      <div>
        <ul>
          {this.props.items &&
            this.props.items.map((item) => {
              return (
                <li>
                  {" "}
                  <Link href={item.page.path}>{item.page.title}</Link>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}
