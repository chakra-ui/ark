import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import {
  ArkDialogBackdrop,
  ArkDialogCloseTrigger,
  ArkDialogContent,
  ArkDialogDescription,
  ArkDialogPositioner,
  ArkDialogRoot,
  ArkDialogTitle,
} from '@ark-ui/angular/dialog'
import {
  ArkMenuContent,
  ArkMenuIndicator,
  ArkMenuItem,
  ArkMenuPositioner,
  ArkMenuRoot,
  ArkMenuSeparator,
  ArkMenuTrigger,
} from '@ark-ui/angular/menu'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { menuExampleStyles } from '../menu-example-styles'
import { MenuChevronDownIcon } from './icons'

@Component({
  selector: 'menu-item-dialog-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkDialogRoot,
    ArkDialogBackdrop,
    ArkDialogPositioner,
    ArkDialogContent,
    ArkDialogTitle,
    ArkDialogDescription,
    ArkDialogCloseTrigger,
    ArkMenuRoot,
    ArkMenuTrigger,
    ArkMenuIndicator,
    ArkMenuPositioner,
    ArkMenuContent,
    ArkMenuItem,
    ArkMenuSeparator,
    ArkPortalComponent,
    MenuChevronDownIcon,
  ],
  template: `
    <div arkMenu #menu="arkMenu">
      <button type="button" arkMenuTrigger>
        Actions
        <span arkMenuIndicator>
          <menu-chevron-down-icon />
        </span>
      </button>
      <ark-portal [originInjector]="menu.getContextCarrier().elementInjector">
        <div arkMenuPositioner>
          <div arkMenuContent>
            <div arkMenuItem value="edit">Edit</div>
            <div arkMenuItem value="duplicate">Duplicate</div>
            <div arkMenuSeparator></div>
            <div arkMenuItem value="delete" (click)="dialogOpen.set(true)">Delete...</div>
          </div>
        </div>
      </ark-portal>
    </div>

    <div arkDialog [(open)]="dialogOpen" role="alertdialog" #dialog="arkDialog">
      <ark-portal [originInjector]="dialog.getContextCarrier().elementInjector">
        <div arkDialogBackdrop></div>
        <div arkDialogPositioner>
          <div arkDialogContent>
            <h2 arkDialogTitle>Confirm Delete</h2>
            <p arkDialogDescription>Are you sure you want to delete this item? This action cannot be undone.</p>
            <button type="button" arkDialogCloseTrigger aria-label="Close">x</button>
            <div>
              <button type="button" (click)="dialogOpen.set(false)">Cancel</button>
              <button type="button" (click)="dialogOpen.set(false)">Delete</button>
            </div>
          </div>
        </div>
      </ark-portal>
    </div>
  `,
  styles: [menuExampleStyles],
})
export class MenuItemDialogExample {
  readonly dialogOpen = signal<boolean | undefined>(false)
}
