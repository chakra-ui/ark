import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import {
  ArkMenuContent,
  ArkMenuIndicator,
  ArkMenuItem,
  ArkMenuPositioner,
  ArkMenuRoot,
  ArkMenuTrigger,
  type MenuSelectionDetails,
} from '@ark-ui/angular/menu'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { menuExampleStyles } from '../menu-example-styles'
import { MenuChevronDownIcon } from './icons'

@Component({
  selector: 'menu-select-event-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkMenuRoot,
    ArkMenuTrigger,
    ArkMenuIndicator,
    ArkMenuPositioner,
    ArkMenuContent,
    ArkMenuItem,
    ArkPortalComponent,
    MenuChevronDownIcon,
  ],
  template: `
    <div arkMenu #root="arkMenu" (select)="onRootSelect($event)">
      <button type="button" arkMenuTrigger>
        Account
        <span arkMenuIndicator>
          <menu-chevron-down-icon />
        </span>
      </button>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <div arkMenuPositioner>
          <div arkMenuContent>
            @for (item of items; track item.value) {
              <div arkMenuItem [value]="item.value" (select)="onItemSelect(item.label)">
                {{ item.label }}
              </div>
            }
          </div>
        </div>
      </ark-portal>
    </div>
    <p>Selected: {{ selected() }}</p>
  `,
  styles: [menuExampleStyles],
})
export class MenuSelectEventExample {
  readonly selected = signal('none')
  readonly items = [
    { value: 'profile', label: 'My Profile' },
    { value: 'settings', label: 'Settings' },
    { value: 'billing', label: 'Billing' },
    { value: 'logout', label: 'Log Out' },
  ]

  onRootSelect(details: MenuSelectionDetails): void {
    this.selected.set(details.value)
  }

  onItemSelect(label: string): void {
    console.log('Item selected:', label)
  }
}
