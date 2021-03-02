import * as React from "react";
import {Card, Item} from "semantic-ui-react";

import {PageService} from "../src/api/page-service";
import {IPage} from "../src/api/interface/page";
import HeaderCMS from "../src/cms-components/header-cms";
import {ComponentType} from "../src/modules/components-enum";
import {IHeaderComponent} from "../src/api/interface/header-component";
import {IFooterComponent} from "../src/api/interface/footer-component";
import FooterCMS from "../src/cms-components/footer-cms";
import {ICardsComponent} from "../src/api/interface/cards-component";
import CardsCMS from "../src/cms-components/cards-cms";
import {INavigationComponent} from "../src/api/interface/navigation-component";
import NavigationCms from "../src/cms-components/navigation-cms";
import {IBlog} from "../src/api/interface/blog";
import BlogTeaser from "../src/cms-components/blog-teaser-cms";
import { MenuService } from "../src/api/menu-service";
import { IMenu } from "../src/api/interface/menu";


export interface IHomeProps {
  page: IPage;
  menu: IMenu;
  blogs: IBlog[];
}

export default class Home extends React.PureComponent<IHomeProps> {
  static async getInitialProps(context): Promise<Partial<IHomeProps>> {
    console.log("CONTEXT url", context.req.url)
    const pageService = new PageService();
    const menuService = new MenuService();
    const pages: IPage[] = await pageService.getPage(context.req.url.substring(1));
    const menu: IMenu[] = await menuService.getMenu();
    const blogs: IBlog[] = await pageService.getBlogs();
    return {page: pages[0], menu: menu[0], blogs: blogs};
  }

  public render() {
    const components: React.ReactElement[] = this.props.page.components.reduce(
      (acc, current) => {
        switch (current.__component) {
          case ComponentType.footer:
            const componentFooter: IFooterComponent = current as IFooterComponent;
            acc.push(
              <FooterCMS
                text={componentFooter.text}
                height={componentFooter.height}
                backgroundColor={componentFooter.backgroundColor}
              ></FooterCMS>
            );

            break;
          case ComponentType.header:
            const componentHeader: IHeaderComponent = current as IHeaderComponent;
            acc.push(
              <HeaderCMS
                background={componentHeader.background}
                title={componentHeader.title}
              ></HeaderCMS>
            );
            break;

          case ComponentType.cards:
            const componentCards: ICardsComponent = current as ICardsComponent;
            acc.push(
              <CardsCMS
                description={componentCards.description}
                items={componentCards.items}
              ></CardsCMS>
            );
            break;

          case ComponentType.navigation:
            const componentNavigation: INavigationComponent = current as INavigationComponent;
            acc.push(
                <NavigationCms {...componentNavigation} menu={this.props.menu}></NavigationCms>
            )
            break;

          default:
            break;
        }

        return acc;
      },
      []
    );

    const blogs: React.ReactElement[] = this.props.blogs.map((blog) => {
      return (
        <Item.Group className="blog-cards">
          <BlogTeaser
            title={blog.title}
            author={blog.author}
            date={blog.date}
            teaser={blog.teaser}
            image={blog.image[0]}
          ></BlogTeaser>
        </Item.Group>
      );
    });

    return (
      <>
        {components}
        {blogs}   

        {/* <div>{this.props.page.title}</div> */}
      </>
    );
  }
}
