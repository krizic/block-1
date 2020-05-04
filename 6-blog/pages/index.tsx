import * as React from "react";

import {PageService} from "../src/api/page-service";
import {IPage} from "../src/api/interface/page";
import HeaderCMS from "../src/cms-components/header-cms";
import {ComponentType} from "../src/modules/components-enum";
import {IHeaderComponent} from "../src/api/interface/header-component";
import {IFooterComponent} from "../src/api/interface/footer-component";
import FooterCMS from "../src/cms-components/footer-cms";
import { ICardsComponent } from "../src/api/interface/cards-component";
import CardsCMS from "../src/cms-components/cards-cms";

export interface IHomeProps {
  page: IPage;
}

export default class Home extends React.PureComponent<IHomeProps> {
  static async getInitialProps(): Promise<Partial<IHomeProps>> {
    const pageService = new PageService();
    const pages: IPage[] = await pageService.getPage("home");
    return {page: pages[0]};
  }

  public render() {
    console.log(this.props);

    const components: React.ReactElement[] =this.props.page.components.reduce((acc, current) => {
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
                <CardsCMS  description={componentCards.description}
                items= {componentCards.items}
                ></CardsCMS>
            );

          break;

        default:
          break;
      }

      return acc;
    }, []);

    return (
      <>
        {components}
        
        {/* <div>{this.props.page.title}</div> */}
      </>
    );
  }
}
