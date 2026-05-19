import { ChangeDetectionStrategy, Component, computed } from '@angular/core'
import {
  ArkMenuContent,
  ArkMenuIndicator,
  ArkMenuItem,
  ArkMenuPositioner,
  ArkMenuRootProvider,
  ArkMenuTrigger,
  useMenu,
  type UseMenuReturn,
} from '@ark-ui/angular/menu'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { menuExampleStyles } from '../menu-example-styles'
import { MenuChevronDownIcon } from './icons'

@Component({
  selector: 'menu-root-provider-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkMenuRootProvider,
    ArkMenuTrigger,
    ArkMenuIndicator,
    ArkMenuPositioner,
    ArkMenuContent,
    ArkMenuItem,
    ArkPortalComponent,
    MenuChevronDownIcon,
  ],
  template: `
    <div class="stack">
      <button type="button" (click)="menu.api().setHighlightedValue('copy')">Highlight Copy</button>
      <div arkMenuRootProvider [value]="menu" #provider="arkMenuRootProvider">
        <button type="button" arkMenuTrigger>
          Edit
          <span arkMenuIndicator>
            <menu-chevron-down-icon />
          </span>
        </button>
        <ark-portal [originInjector]="provider.getContextCarrier().elementInjector">
          <div arkMenuPositioner>
            <div arkMenuContent>
              <div arkMenuItem value="cut">Cut</div>
              <div arkMenuItem value="copy">Copy</div>
              <div arkMenuItem value="paste">Paste</div>
              <div arkMenuItem value="delete">Delete</div>
            </div>
          </div>
        </ark-portal>
      </div>
    </div>
  `,
  styles: [menuExampleStyles],
})
export class MenuRootProviderExample {
  readonly menu: UseMenuReturn = useMenu({ context: () => ({}) })
  readonly openLabel = computed(() => (this.menu.api().open ? 'open' : 'closed'))
}
