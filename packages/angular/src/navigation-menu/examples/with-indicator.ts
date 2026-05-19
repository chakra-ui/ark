import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkNavigationMenuArrow,
  ArkNavigationMenuContent,
  ArkNavigationMenuIndicator,
  ArkNavigationMenuItem,
  ArkNavigationMenuItemIndicator,
  ArkNavigationMenuLink,
  ArkNavigationMenuList,
  ArkNavigationMenuRoot,
  ArkNavigationMenuTrigger,
} from '@ark-ui/angular/navigation-menu'
import { navigationMenuExampleStyles } from '../navigation-menu-example-styles'
import { NavigationMenuChevronDownIcon } from './icons'

@Component({
  selector: 'navigation-menu-with-indicator-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkNavigationMenuRoot,
    ArkNavigationMenuList,
    ArkNavigationMenuItem,
    ArkNavigationMenuTrigger,
    ArkNavigationMenuContent,
    ArkNavigationMenuIndicator,
    ArkNavigationMenuItemIndicator,
    ArkNavigationMenuArrow,
    ArkNavigationMenuLink,
    NavigationMenuChevronDownIcon,
  ],
  template: `
    <nav arkNavigationMenu>
      <div arkNavigationMenuList>
        <div arkNavigationMenuItem value="features">
          <button type="button" arkNavigationMenuTrigger>
            Features
            <span arkNavigationMenuItemIndicator class="navigation-menu__trigger-icon">
              <navigation-menu-chevron-down-icon />
            </span>
          </button>
          <div arkNavigationMenuContent>
            <a arkNavigationMenuLink href="#overview">Overview</a>
          </div>
        </div>

        <div arkNavigationMenuItem value="docs">
          <button type="button" arkNavigationMenuTrigger>
            Documentation
            <span arkNavigationMenuItemIndicator class="navigation-menu__trigger-icon">
              <navigation-menu-chevron-down-icon />
            </span>
          </button>
          <div arkNavigationMenuContent>
            <a arkNavigationMenuLink href="#introduction">Introduction</a>
          </div>
        </div>

        <span arkNavigationMenuIndicator>
          <span arkNavigationMenuArrow></span>
        </span>
      </div>
    </nav>
  `,
  styles: [navigationMenuExampleStyles],
})
export class NavigationMenuWithIndicatorExample {}
