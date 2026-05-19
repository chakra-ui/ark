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
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { ArkPresenceComponent } from '@ark-ui/angular/presence'
import { dialogExampleStyles } from '../dialog-example-styles'
import { DialogXIcon } from './icons'

@Component({
  selector: 'dialog-lazy-mount-example',
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
    ArkPortalComponent,
    ArkPresenceComponent,
    DialogXIcon,
  ],
  template: `
    <div arkDialog #root="arkDialog">
      <button type="button" arkDialogTrigger>Open Dialog</button>
      <ark-presence
        [present]="root.api().open"
        lazyMount
        unmountOnExit
        [originInjector]="root.getContextCarrier().elementInjector"
      >
        <ng-template>
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkDialogBackdrop></div>
            <div arkDialogPositioner>
              <div arkDialogContent>
                <button type="button" arkDialogCloseTrigger aria-label="Close">
                  <dialog-x-icon />
                </button>
                <h2 arkDialogTitle>Lazy Loaded</h2>
                <p arkDialogDescription>This dialog content is only mounted when opened and unmounts on close.</p>
              </div>
            </div>
          </ark-portal>
        </ng-template>
      </ark-presence>
    </div>
  `,
  styles: [dialogExampleStyles],
})
export class DialogLazyMountExample {}
