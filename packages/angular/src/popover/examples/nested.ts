import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
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

@Component({
  selector: 'popover-nested-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkPopoverRoot,
    ArkPopoverTrigger,
    ArkPopoverPositioner,
    ArkPopoverContent,
    ArkPopoverTitle,
    ArkPopoverDescription,
    ArkPortalComponent,
    ArkPresenceComponent,
  ],
  template: `
    <div arkPopover #root="arkPopover">
      <button type="button" arkPopoverTrigger>Click Me</button>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <div arkPopoverPositioner>
          <div arkPopoverContent>
            <h2 arkPopoverTitle>Settings</h2>
            <p arkPopoverDescription>Manage your preferences and account settings.</p>
            <div arkPopover [positioning]="{ placement: 'right' }" #nested="arkPopover">
              <button type="button" arkPopoverTrigger>Advanced</button>
              <ark-presence
                [present]="nested.api().open"
                lazyMount
                unmountOnExit
                [originInjector]="nested.getContextCarrier().elementInjector"
              >
                <ng-template>
                  <ark-portal [originInjector]="nested.getContextCarrier().elementInjector">
                    <div arkPopoverPositioner>
                      <div arkPopoverContent>
                        <h2 arkPopoverTitle>Advanced Settings</h2>
                        <p arkPopoverDescription>Configure advanced options for power users.</p>
                      </div>
                    </div>
                  </ark-portal>
                </ng-template>
              </ark-presence>
            </div>
          </div>
        </div>
      </ark-portal>
    </div>
  `,
  styles: [popoverExampleStyles],
})
export class PopoverNestedExample {}
