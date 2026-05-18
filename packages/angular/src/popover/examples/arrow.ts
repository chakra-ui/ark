import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkPopoverArrow,
  ArkPopoverArrowTip,
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
  selector: 'popover-arrow-example',
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
    ArkPopoverArrow,
    ArkPopoverArrowTip,
    ArkPortalComponent,
    PopoverXIcon,
  ],
  template: `
    <div arkPopover #root="arkPopover">
      <button type="button" arkPopoverTrigger>Click Me</button>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <div arkPopoverPositioner>
          <div arkPopoverContent>
            <div arkPopoverArrow>
              <div arkPopoverArrowTip></div>
            </div>
            <button type="button" arkPopoverCloseTrigger aria-label="Close">
              <popover-x-icon />
            </button>
            <h2 arkPopoverTitle>Notifications</h2>
            <p arkPopoverDescription>You have 3 unread messages in your inbox.</p>
          </div>
        </div>
      </ark-portal>
    </div>
  `,
  styles: [popoverExampleStyles],
})
export class PopoverArrowExample {}
