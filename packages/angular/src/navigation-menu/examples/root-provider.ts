import { ChangeDetectionStrategy, Component, computed } from '@angular/core'
import {
  ArkNavigationMenuContent,
  ArkNavigationMenuItem,
  ArkNavigationMenuLink,
  ArkNavigationMenuList,
  ArkNavigationMenuRootProvider,
  ArkNavigationMenuTrigger,
  useNavigationMenu,
  type UseNavigationMenuReturn,
} from '@ark-ui/angular/navigation-menu'
import { navigationMenuExampleStyles } from '../navigation-menu-example-styles'
import { NavigationMenuChevronDownIcon } from './icons'

@Component({
  selector: 'navigation-menu-root-provider-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkNavigationMenuRootProvider,
    ArkNavigationMenuList,
    ArkNavigationMenuItem,
    ArkNavigationMenuTrigger,
    ArkNavigationMenuContent,
    ArkNavigationMenuLink,
    NavigationMenuChevronDownIcon,
  ],
  template: `
    <div class="stack">
      <output>open: {{ openValue() }}</output>
      <nav arkNavigationMenuRootProvider [value]="navigationMenu">
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
export class NavigationMenuRootProviderExample {
  readonly navigationMenu: UseNavigationMenuReturn = useNavigationMenu({ context: () => ({}) })
  readonly openValue = computed(() => {
    const value = this.navigationMenu.api().value
    return value ?? ''
  })
}
