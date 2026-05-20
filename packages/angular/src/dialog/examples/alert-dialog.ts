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
import { dialogExampleStyles } from '../dialog-example-styles'

@Component({
  selector: 'dialog-alert-dialog-example',
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
  ],
  template: `
    <div arkDialog role="alertdialog" #root="arkDialog">
      <button type="button" arkDialogTrigger>Delete Account</button>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <div arkDialogBackdrop></div>
        <div arkDialogPositioner>
          <div arkDialogContent>
            <h2 arkDialogTitle>Are you absolutely sure?</h2>
            <p arkDialogDescription>
              This action cannot be undone. This will permanently delete your account and remove your data from our
              servers.
            </p>
            <div class="actions">
              <button type="button" arkDialogCloseTrigger class="button">Cancel</button>
              <button type="button" data-variant="solid">Delete Account</button>
            </div>
          </div>
        </div>
      </ark-portal>
    </div>
  `,
  styles: [dialogExampleStyles],
})
export class DialogAlertDialogExample {}
