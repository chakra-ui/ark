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
  selector: 'popover-positioning-example',
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
    <div
      arkPopover
      [positioning]="{ placement: 'left-start', offset: { mainAxis: 12, crossAxis: 12 } }"
      #root="arkPopover"
    >
      <button type="button" arkPopoverTrigger>Click Me</button>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <div arkPopoverPositioner>
          <div arkPopoverContent>
            <button type="button" arkPopoverCloseTrigger aria-label="Close">
              <popover-x-icon />
            </button>
            <h2 arkPopoverTitle>Left Placement</h2>
            <p arkPopoverDescription>This popover appears on the left with custom offset values.</p>
          </div>
        </div>
      </ark-portal>
    </div>
  `,
  styles: [popoverExampleStyles],
})
export class PopoverPositioningExample {}
