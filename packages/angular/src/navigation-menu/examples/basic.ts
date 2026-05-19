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
} from '@ark-ui/angular/navigation-menu'
import { navigationMenuExampleStyles } from '../navigation-menu-example-styles'
import { NavigationMenuChevronDownIcon } from './icons'

@Component({
  selector: 'navigation-menu-basic-example',
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
    NavigationMenuChevronDownIcon,
  ],
  template: `
    <nav arkNavigationMenu>
      <div arkNavigationMenuList>
        <div arkNavigationMenuItem value="features">
          <button type="button" arkNavigationMenuTrigger>
            Features
            <span class="navigation-menu__trigger-icon">
              <navigation-menu-chevron-down-icon />
            </span>
          </button>
          <div arkNavigationMenuContent>
            <span arkNavigationMenuIndicator>
              <span arkNavigationMenuArrow></span>
            </span>
            <a arkNavigationMenuLink href="#overview">Overview</a>
            <a arkNavigationMenuLink href="#features">Features</a>
          </div>
        </div>

        <div arkNavigationMenuItem value="docs">
          <button type="button" arkNavigationMenuTrigger>
            Documentation
            <span class="navigation-menu__trigger-icon">
              <navigation-menu-chevron-down-icon />
            </span>
          </button>
          <div arkNavigationMenuContent>
            <span arkNavigationMenuIndicator>
              <span arkNavigationMenuArrow></span>
            </span>
            <a arkNavigationMenuLink href="#introduction">Introduction</a>
            <a arkNavigationMenuLink href="#installation">Installation</a>
            <a arkNavigationMenuLink href="#components">Components</a>
          </div>
        </div>

        <div arkNavigationMenuItem value="about">
          <a arkNavigationMenuLink href="#about">About</a>
        </div>
      </div>
    </nav>
  `,
  styles: [navigationMenuExampleStyles],
})
export class NavigationMenuBasicExample {}
