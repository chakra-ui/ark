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
            <span>
              <navigation-menu-chevron-down-icon />
            </span>
          </button>
          <div arkNavigationMenuContent>
            <a arkNavigationMenuLink href="#analytics">Analytics Platform</a>
            <a arkNavigationMenuLink href="#engagement">Customer Engagement</a>
            <a arkNavigationMenuLink href="#automation">Marketing Automation</a>
          </div>
        </div>

        <div arkNavigationMenuItem value="company">
          <button type="button" arkNavigationMenuTrigger>
            Company
            <span>
              <navigation-menu-chevron-down-icon />
            </span>
          </button>
          <div arkNavigationMenuContent>
            <a arkNavigationMenuLink href="#about-us">About Us</a>
            <a arkNavigationMenuLink href="#leadership">Leadership Team</a>
            <a arkNavigationMenuLink href="#careers">Careers</a>
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
