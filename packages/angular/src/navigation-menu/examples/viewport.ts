import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkNavigationMenuArrow,
  ArkNavigationMenuContent,
  ArkNavigationMenuIndicator,
  ArkNavigationMenuItem,
  ArkNavigationMenuLink,
  ArkNavigationMenuList,
  ArkNavigationMenuRoot,
  ArkNavigationMenuTrigger,
  ArkNavigationMenuViewport,
  ArkNavigationMenuViewportPositioner,
} from '@ark-ui/angular/navigation-menu'
import { navigationMenuExampleStyles } from '../navigation-menu-example-styles'
import { NavigationMenuChevronDownIcon } from './icons'

@Component({
  selector: 'navigation-menu-viewport-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkNavigationMenuRoot,
    ArkNavigationMenuList,
    ArkNavigationMenuItem,
    ArkNavigationMenuTrigger,
    ArkNavigationMenuContent,
    ArkNavigationMenuIndicator,
    ArkNavigationMenuArrow,
    ArkNavigationMenuLink,
    ArkNavigationMenuViewport,
    ArkNavigationMenuViewportPositioner,
    NavigationMenuChevronDownIcon,
  ],
  template: `
    <nav arkNavigationMenu data-variant="viewport">
      <div arkNavigationMenuList>
        <div arkNavigationMenuItem value="products">
          <button type="button" arkNavigationMenuTrigger>
            Products
            <span class="navigation-menu__trigger-icon">
              <navigation-menu-chevron-down-icon />
            </span>
          </button>
          <div
            arkNavigationMenuContent
            class="navigation-menu__viewport-content navigation-menu__viewport-content--products"
          >
            <div>
              <a arkNavigationMenuLink class="navigation-menu__viewport-link" href="#analytics">Analytics Platform</a>
              <a arkNavigationMenuLink class="navigation-menu__viewport-link" href="#engagement">Customer Engagement</a>
              <a arkNavigationMenuLink class="navigation-menu__viewport-link" href="#automation">
                Marketing Automation
              </a>
              <a arkNavigationMenuLink class="navigation-menu__viewport-link" href="#integration">Data Integration</a>
              <a arkNavigationMenuLink class="navigation-menu__viewport-link" href="#enterprise">
                Enterprise Solutions
              </a>
              <a arkNavigationMenuLink class="navigation-menu__viewport-link" href="#api">API Documentation</a>
            </div>
            <div>
              <a arkNavigationMenuLink class="navigation-menu__viewport-link" href="#case-studies">Case Studies</a>
              <a arkNavigationMenuLink class="navigation-menu__viewport-link" href="#success">Success Stories</a>
              <a arkNavigationMenuLink class="navigation-menu__viewport-link" href="#partners">Integration Partners</a>
              <a arkNavigationMenuLink class="navigation-menu__viewport-link" href="#security">Security & Compliance</a>
            </div>
          </div>
        </div>

        <div arkNavigationMenuItem value="company">
          <button type="button" arkNavigationMenuTrigger>
            Company
            <span class="navigation-menu__trigger-icon">
              <navigation-menu-chevron-down-icon />
            </span>
          </button>
          <div
            arkNavigationMenuContent
            class="navigation-menu__viewport-content navigation-menu__viewport-content--company"
          >
            <div>
              <a arkNavigationMenuLink class="navigation-menu__viewport-link" href="#about-us">About Us</a>
              <a arkNavigationMenuLink class="navigation-menu__viewport-link" href="#leadership">Leadership Team</a>
              <a arkNavigationMenuLink class="navigation-menu__viewport-link" href="#careers">Careers</a>
              <a arkNavigationMenuLink class="navigation-menu__viewport-link" href="#press">Press Releases</a>
            </div>
            <div>
              <a arkNavigationMenuLink class="navigation-menu__viewport-link" href="#investors">Investors</a>
              <a arkNavigationMenuLink class="navigation-menu__viewport-link" href="#partners">Partners</a>
              <a arkNavigationMenuLink class="navigation-menu__viewport-link" href="#responsibility">
                Corporate Responsibility
              </a>
            </div>
          </div>
        </div>

        <div arkNavigationMenuItem value="developers">
          <button type="button" arkNavigationMenuTrigger>
            Developers
            <span class="navigation-menu__trigger-icon">
              <navigation-menu-chevron-down-icon />
            </span>
          </button>
          <div
            arkNavigationMenuContent
            class="navigation-menu__viewport-content navigation-menu__viewport-content--developers"
          >
            <div>
              <a arkNavigationMenuLink class="navigation-menu__viewport-link" href="#api-docs">API Documentation</a>
              <a arkNavigationMenuLink class="navigation-menu__viewport-link" href="#sdks">SDKs & Libraries</a>
              <a arkNavigationMenuLink class="navigation-menu__viewport-link" href="#guides">Developer Guides</a>
              <a arkNavigationMenuLink class="navigation-menu__viewport-link" href="#samples">Code Samples</a>
              <a arkNavigationMenuLink class="navigation-menu__viewport-link" href="#webhooks">Webhooks</a>
              <a arkNavigationMenuLink class="navigation-menu__viewport-link" href="#graphql">GraphQL Explorer</a>
            </div>
            <div>
              <a arkNavigationMenuLink class="navigation-menu__viewport-link" href="#community">Developer Community</a>
              <a arkNavigationMenuLink class="navigation-menu__viewport-link" href="#changelog">Changelog</a>
              <a arkNavigationMenuLink class="navigation-menu__viewport-link" href="#status">Status Page</a>
              <a arkNavigationMenuLink class="navigation-menu__viewport-link" href="#limits">Rate Limits</a>
            </div>
          </div>
        </div>

        <div arkNavigationMenuItem value="pricing">
          <a arkNavigationMenuLink href="#pricing">Pricing</a>
        </div>

        <span arkNavigationMenuIndicator>
          <span arkNavigationMenuArrow></span>
        </span>
      </div>

      <div arkNavigationMenuViewportPositioner align="start">
        <div arkNavigationMenuViewport></div>
      </div>
    </nav>
  `,
  styles: [navigationMenuExampleStyles],
})
export class NavigationMenuViewportExample {}
