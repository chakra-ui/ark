import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import {
  ArkDialogBackdrop,
  ArkDialogCloseTrigger,
  ArkDialogContent,
  ArkDialogDescription,
  ArkDialogPositioner,
  ArkDialogRoot,
  ArkDialogTitle,
} from '@ark-ui/angular/dialog'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { dialogExampleStyles } from '../dialog-example-styles'
import { DialogXIcon } from './icons'

const promise1 = Promise.resolve()
const promise2 = Promise.resolve()

@Component({
  selector: 'dialog-rapid-state-change-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkDialogRoot,
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
    <button type="button" (click)="handleClick()">Open Dialog {{ open() }}</button>
    <div arkDialog [(open)]="open" #root="arkDialog">
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <div arkDialogBackdrop></div>
        <div arkDialogPositioner>
          <div arkDialogContent>
            <button type="button" arkDialogCloseTrigger aria-label="Close">
              <dialog-x-icon />
            </button>
            <h2 arkDialogTitle>Rapid State Test</h2>
            <p arkDialogDescription>
              This dialog tests rapid state changes. If working correctly, the dialog should be open after clicking the
              button.
            </p>
          </div>
        </div>
      </ark-portal>
    </div>
  `,
  styles: [dialogExampleStyles],
})
export class DialogRapidStateChangeExample {
  readonly open = signal<boolean | undefined>(false)

  async handleClick(): Promise<void> {
    this.open.set(true)
    await promise1
    this.open.set(false)
    await promise2
    this.open.set(true)
  }
}
