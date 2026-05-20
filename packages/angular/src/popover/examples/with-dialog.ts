import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkDialogBackdrop,
  ArkDialogCloseTrigger,
  ArkDialogContent,
  ArkDialogDescription,
  ArkDialogPositioner,
  ArkDialogRoot,
  ArkDialogTitle,
  ArkDialogTrigger,
} from '@ark-ui/angular/dialog'
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
import { ArkPresenceComponent } from '@ark-ui/angular/presence'
import { dialogExampleStyles } from '../../dialog/dialog-example-styles'
import { popoverExampleStyles } from '../popover-example-styles'
import { PopoverXIcon } from './icons'

@Component({
  selector: 'popover-with-dialog-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkDialogRoot,
    ArkDialogTrigger,
    ArkDialogBackdrop,
    ArkDialogPositioner,
    ArkDialogContent,
    ArkDialogTitle,
    ArkDialogDescription,
    ArkDialogCloseTrigger,
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
    ArkPresenceComponent,
    PopoverXIcon,
  ],
  template: `
    <div arkDialog #dialog="arkDialog">
      <button type="button" arkDialogTrigger>Open Dialog</button>
      <ark-portal [originInjector]="dialog.getContextCarrier().elementInjector">
        <div arkDialogBackdrop></div>
        <div arkDialogPositioner>
          <div arkDialogContent>
            <button type="button" arkDialogCloseTrigger aria-label="Close">
              <popover-x-icon />
            </button>
            <h2 arkDialogTitle>Edit Profile</h2>
            <p arkDialogDescription>Update your profile information below.</p>
            <div class="dialog-body">
              <div arkPopover #popover="arkPopover">
                <button type="button" arkPopoverTrigger>More Options</button>
                <ark-presence
                  [present]="popover.api().open"
                  lazyMount
                  unmountOnExit
                  [originInjector]="popover.getContextCarrier().elementInjector"
                >
                  <ng-template>
                    <ark-portal [originInjector]="popover.getContextCarrier().elementInjector">
                      <div arkPopoverPositioner>
                        <div arkPopoverContent>
                          <div arkPopoverArrow>
                            <div arkPopoverArrowTip></div>
                          </div>
                          <button type="button" arkPopoverCloseTrigger aria-label="Close">
                            <popover-x-icon />
                          </button>
                          <h2 arkPopoverTitle>Additional Settings</h2>
                          <p arkPopoverDescription>This popover renders correctly above the dialog.</p>
                        </div>
                      </div>
                    </ark-portal>
                  </ng-template>
                </ark-presence>
              </div>
            </div>
          </div>
        </div>
      </ark-portal>
    </div>
  `,
  styles: [
    dialogExampleStyles,
    popoverExampleStyles,
    `
      .dialog-body {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
        gap: 0.75rem;
        margin-top: 1.25rem;
      }
    `,
  ],
})
export class PopoverWithDialogExample {}
