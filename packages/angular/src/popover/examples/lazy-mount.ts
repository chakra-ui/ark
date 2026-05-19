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
import { ArkPresenceComponent } from '@ark-ui/angular/presence'
import { popoverExampleStyles } from '../popover-example-styles'
import { PopoverXIcon } from './icons'

@Component({
  selector: 'popover-lazy-mount-example',
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
    ArkPresenceComponent,
    PopoverXIcon,
  ],
  template: `
    <div arkPopover #root="arkPopover">
      <button type="button" arkPopoverTrigger>Click Me</button>
      <ark-presence
        [present]="root.api().open"
        lazyMount
        unmountOnExit
        [originInjector]="root.getContextCarrier().elementInjector"
      >
        <ng-template>
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkPopoverPositioner>
              <div arkPopoverContent>
                <button type="button" arkPopoverCloseTrigger aria-label="Close">
                  <popover-x-icon />
                </button>
                <h2 arkPopoverTitle>Lazy Loaded</h2>
                <p arkPopoverDescription>This content is only mounted when the popover opens.</p>
              </div>
            </div>
          </ark-portal>
        </ng-template>
      </ark-presence>
    </div>
  `,
  styles: [popoverExampleStyles],
})
export class PopoverLazyMountExample {}
