import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkPopoverCloseTrigger,
  ArkPopoverContent,
  ArkPopoverDescription,
  ArkPopoverPositioner,
  ArkPopoverRoot,
  ArkPopoverTitle,
  ArkPopoverTrigger,
} from '@ark-ui/angular/popover'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { popoverExampleStyles } from '../popover-example-styles'
import { PopoverXIcon } from './icons'

@Component({
  selector: 'popover-modal-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkPopoverRoot,
    ArkPopoverTrigger,
    ArkPopoverPositioner,
    ArkPopoverContent,
    ArkPopoverTitle,
    ArkPopoverDescription,
    ArkPopoverCloseTrigger,
    ArkPortalComponent,
    PopoverXIcon,
  ],
  template: `
    <div arkPopover modal #root="arkPopover">
      <button type="button" arkPopoverTrigger>Click Me</button>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <div arkPopoverPositioner>
          <div arkPopoverContent>
            <button type="button" arkPopoverCloseTrigger aria-label="Close">
              <popover-x-icon />
            </button>
            <h2 arkPopoverTitle>Confirm Action</h2>
            <p arkPopoverDescription>Focus is trapped inside this modal popover until dismissed.</p>
          </div>
        </div>
      </ark-portal>
    </div>
  `,
  styles: [popoverExampleStyles],
})
export class PopoverModalExample {}
