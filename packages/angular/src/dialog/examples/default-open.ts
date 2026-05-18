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
import { DialogXIcon } from './icons'

@Component({
  selector: 'dialog-default-open-example',
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
    DialogXIcon,
  ],
  template: `
    <div arkDialog defaultOpen #root="arkDialog">
      <button type="button" arkDialogTrigger>Open Dialog</button>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <div arkDialogBackdrop></div>
        <div arkDialogPositioner>
          <div arkDialogContent>
            <button type="button" arkDialogCloseTrigger aria-label="Close">
              <dialog-x-icon />
            </button>
            <h2 arkDialogTitle>Welcome</h2>
            <p arkDialogDescription>This dialog starts open by default.</p>
          </div>
        </div>
      </ark-portal>
    </div>
  `,
  styles: [dialogExampleStyles],
})
export class DialogDefaultOpenExample {}
