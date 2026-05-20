import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkPopoverAnchor,
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
  selector: 'popover-anchor-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkPopoverRoot,
    ArkPopoverTrigger,
    ArkPopoverAnchor,
    ArkPopoverPositioner,
    ArkPopoverContent,
    ArkPopoverTitle,
    ArkPopoverDescription,
    ArkPopoverCloseTrigger,
    ArkPortalComponent,
    PopoverXIcon,
  ],
  template: `
    <div arkPopover #root="arkPopover">
      <div class="hstack">
        <button type="button" arkPopoverTrigger>Click Me</button>
        <span arkPopoverAnchor>
          <input class="field" placeholder="Type here..." />
        </span>
      </div>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <div arkPopoverPositioner>
          <div arkPopoverContent>
            <button type="button" arkPopoverCloseTrigger aria-label="Close">
              <popover-x-icon />
            </button>
            <h2 arkPopoverTitle>Title</h2>
            <p arkPopoverDescription>Description</p>
          </div>
        </div>
      </ark-portal>
    </div>
  `,
  styles: [popoverExampleStyles],
})
export class PopoverAnchorExample {}
