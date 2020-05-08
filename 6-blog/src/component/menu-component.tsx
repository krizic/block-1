import * as React from "react";
import Link from "next/link";
import {Menu, Dropdown} from 'semantic-ui-react';

import {IMenu} from "../api/interface/menu";

export interface IMenuComponentProps extends IMenu {}

export class MenuComponent extends React.PureComponent<IMenuComponentProps> {
  public render() {
    return (
      <div>
        <Menu borderless fluid secondary>
          {this.props.items &&
            this.props.items.map((item) => {
              if (item.page) {
                return (
                  <Menu.Item>
                    <Link href={item.page.path}>{item.page.title}</Link>
                  </Menu.Item>
                );
              } else {
                return item.items.map((subItem) => {
                  return (
                    <Dropdown text={subItem.title} pointing className="link item">                      
                      <Dropdown.Menu>
                        {subItem.pages.map((page) => {
                          return (
                            <Dropdown.Item>
                              <Link href={page.path}>{page.title}</Link>
                            </Dropdown.Item>
                          );
                        })}
                      </Dropdown.Menu>
                    </Dropdown>
                  );
                });
              }
            })}
        </Menu>
      </div>
    );
  }
}
