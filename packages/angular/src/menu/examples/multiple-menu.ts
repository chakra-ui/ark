import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
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

interface MenuItemEntry {
  label: string
  value: string
}

@Component({
  selector: 'menu-multiple-menu-item',
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
    <div arkMenu [id]="id" (select)="onSelect($event)" #root="arkMenu">
      <button type="button" arkMenuTrigger>
        {{ label }}
        <span arkMenuIndicator>
          <menu-chevron-down-icon />
        </span>
      </button>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <div arkMenuPositioner>
          <div arkMenuContent>
            @for (item of items; track item.value) {
              <div arkMenuItem [value]="item.value">{{ item.label }}</div>
            }
          </div>
        </div>
      </ark-portal>
    </div>
  `,
  styles: [menuExampleStyles],
})
export class MenuMultipleMenuItem {
  @Input({ required: true }) id!: string
  @Input({ required: true }) label!: string
  @Input({ required: true }) items: MenuItemEntry[] = []

  onSelect(_details: MenuSelectionDetails): void {
    // consumer hook
  }
}

@Component({
  selector: 'menu-multiple-menu-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MenuMultipleMenuItem],
  template: `
    <div style="display: flex; gap: 0.5rem">
      <menu-multiple-menu-item id="file" label="File" [items]="fileItems" />
      <menu-multiple-menu-item id="edit" label="Edit" [items]="editItems" />
    </div>
  `,
})
export class MenuMultipleMenuExample {
  readonly fileItems: MenuItemEntry[] = [
    { label: 'New File', value: 'new' },
    { label: 'Open...', value: 'open' },
    { label: 'Save', value: 'save' },
  ]

  readonly editItems: MenuItemEntry[] = [
    { label: 'Undo', value: 'undo' },
    { label: 'Redo', value: 'redo' },
    { label: 'Cut', value: 'cut' },
    { label: 'Copy', value: 'copy' },
  ]
}
