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
              <a arkNavigationMenuLink class="navigation-menu__viewport-link" href="#">Analytics Platform</a>
              <a arkNavigationMenuLink class="navigation-menu__viewport-link" href="#">Customer Engagement</a>
              <a arkNavigationMenuLink class="navigation-menu__viewport-link" href="#">Marketing Automation</a>
              <a arkNavigationMenuLink class="navigation-menu__viewport-link" href="#">Data Integration</a>
              <a arkNavigationMenuLink class="navigation-menu__viewport-link" href="#">Enterprise Solutions</a>
              <a arkNavigationMenuLink class="navigation-menu__viewport-link" href="#">API Documentation</a>
            </div>
            <div>
              <a arkNavigationMenuLink class="navigation-menu__viewport-link" href="#">Case Studies</a>
              <a arkNavigationMenuLink class="navigation-menu__viewport-link" href="#">Success Stories</a>
              <a arkNavigationMenuLink class="navigation-menu__viewport-link" href="#">Integration Partners</a>
              <a arkNavigationMenuLink class="navigation-menu__viewport-link" href="#">Security & Compliance</a>
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
              <a arkNavigationMenuLink class="navigation-menu__viewport-link" href="#">About Us</a>
              <a arkNavigationMenuLink class="navigation-menu__viewport-link" href="#">Leadership Team</a>
              <a arkNavigationMenuLink class="navigation-menu__viewport-link" href="#">Careers</a>
              <a arkNavigationMenuLink class="navigation-menu__viewport-link" href="#">Press Releases</a>
            </div>
            <div>
              <a arkNavigationMenuLink class="navigation-menu__viewport-link" href="#">Investors</a>
              <a arkNavigationMenuLink class="navigation-menu__viewport-link" href="#">Partners</a>
              <a arkNavigationMenuLink class="navigation-menu__viewport-link" href="#">Corporate Responsibility</a>
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
              <a arkNavigationMenuLink class="navigation-menu__viewport-link" href="#">API Documentation</a>
              <a arkNavigationMenuLink class="navigation-menu__viewport-link" href="#">SDKs & Libraries</a>
              <a arkNavigationMenuLink class="navigation-menu__viewport-link" href="#">Developer Guides</a>
              <a arkNavigationMenuLink class="navigation-menu__viewport-link" href="#">Code Samples</a>
              <a arkNavigationMenuLink class="navigation-menu__viewport-link" href="#">Webhooks</a>
              <a arkNavigationMenuLink class="navigation-menu__viewport-link" href="#">GraphQL Explorer</a>
            </div>
            <div>
              <a arkNavigationMenuLink class="navigation-menu__viewport-link" href="#">Developer Community</a>
              <a arkNavigationMenuLink class="navigation-menu__viewport-link" href="#">Changelog</a>
              <a arkNavigationMenuLink class="navigation-menu__viewport-link" href="#">Status Page</a>
              <a arkNavigationMenuLink class="navigation-menu__viewport-link" href="#">Rate Limits</a>
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
