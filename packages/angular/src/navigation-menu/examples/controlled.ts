import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import {
  ArkNavigationMenuContent,
  ArkNavigationMenuItem,
  ArkNavigationMenuLink,
  ArkNavigationMenuList,
  ArkNavigationMenuRoot,
  ArkNavigationMenuTrigger,
} from '@ark-ui/angular/navigation-menu'
import { navigationMenuExampleStyles } from '../navigation-menu-example-styles'
import { NavigationMenuChevronDownIcon } from './icons'

@Component({
  selector: 'navigation-menu-controlled-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkNavigationMenuRoot,
    ArkNavigationMenuList,
    ArkNavigationMenuItem,
    ArkNavigationMenuTrigger,
    ArkNavigationMenuContent,
    ArkNavigationMenuLink,
    NavigationMenuChevronDownIcon,
  ],
  template: `
    <div class="stack">
      <output>value: {{ value() || '' }}</output>
      <nav arkNavigationMenu [(value)]="value">
        <div arkNavigationMenuList>
          <div arkNavigationMenuItem value="features">
            <button type="button" arkNavigationMenuTrigger>
              Features
              <span class="navigation-menu__trigger-icon">
                <navigation-menu-chevron-down-icon />
              </span>
            </button>
            <div arkNavigationMenuContent>
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
              <a arkNavigationMenuLink href="#introduction">Introduction</a>
              <a arkNavigationMenuLink href="#installation">Installation</a>
            </div>
          </div>

          <div arkNavigationMenuItem value="about">
            <a arkNavigationMenuLink href="#about">About</a>
          </div>
        </div>
      </nav>
    </div>
  `,
  styles: [navigationMenuExampleStyles],
})
export class NavigationMenuControlledExample {
  readonly value = signal<string | undefined>('')
}
