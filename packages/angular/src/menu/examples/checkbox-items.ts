import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import {
  ArkMenuCheckboxItem,
  ArkMenuContent,
  ArkMenuIndicator,
  ArkMenuItemIndicator,
  ArkMenuItemText,
  ArkMenuPositioner,
  ArkMenuRoot,
  ArkMenuTrigger,
} from '@ark-ui/angular/menu'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { menuExampleStyles } from '../menu-example-styles'
import { MenuCheckIcon, MenuChevronDownIcon } from './icons'

@Component({
  selector: 'menu-checkbox-items-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkMenuRoot,
    ArkMenuTrigger,
    ArkMenuIndicator,
    ArkMenuPositioner,
    ArkMenuContent,
    ArkMenuCheckboxItem,
    ArkMenuItemIndicator,
    ArkMenuItemText,
    ArkPortalComponent,
    MenuCheckIcon,
    MenuChevronDownIcon,
  ],
  template: `
    <div arkMenu #root="arkMenu">
      <button type="button" arkMenuTrigger>
        View
        <span arkMenuIndicator>
          <menu-chevron-down-icon />
        </span>
      </button>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <div arkMenuPositioner>
          <div arkMenuContent>
            <div arkMenuCheckboxItem value="toolbar" [(checked)]="showToolbar">
              <span arkMenuItemIndicator>
                <menu-check-icon />
              </span>
              <span arkMenuItemText value="toolbar">Show Toolbar</span>
            </div>
            <div arkMenuCheckboxItem value="status-bar" [(checked)]="showStatusBar">
              <span arkMenuItemIndicator>
                <menu-check-icon />
              </span>
              <span arkMenuItemText value="status-bar">Show Status Bar</span>
            </div>
          </div>
        </div>
      </ark-portal>
    </div>
  `,
  styles: [menuExampleStyles],
})
export class MenuCheckboxItemsExample {
  readonly showToolbar = signal<boolean | undefined>(true)
  readonly showStatusBar = signal<boolean | undefined>(false)
}
