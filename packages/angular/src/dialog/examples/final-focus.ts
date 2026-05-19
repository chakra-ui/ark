import { ChangeDetectionStrategy, Component, type ElementRef, viewChild } from '@angular/core'
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
  selector: 'dialog-final-focus-example',
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
    <div class="stack">
      <button type="button" #finalFocus>I will receive focus when dialog closes</button>
      <div arkDialog [finalFocusEl]="finalFocusEl" #root="arkDialog">
        <button type="button" arkDialogTrigger>Open Dialog</button>
        <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
          <div arkDialogBackdrop></div>
          <div arkDialogPositioner>
            <div arkDialogContent>
              <button type="button" arkDialogCloseTrigger aria-label="Close">
                <dialog-x-icon />
              </button>
              <h2 arkDialogTitle>Focus Redirect</h2>
              <p arkDialogDescription>
                When this dialog closes, focus will return to the button above instead of the trigger.
              </p>
            </div>
          </div>
        </ark-portal>
      </div>
    </div>
  `,
  styles: [dialogExampleStyles],
})
export class DialogFinalFocusExample {
  private readonly finalFocusButton = viewChild<ElementRef<HTMLButtonElement>>('finalFocus')
  readonly finalFocusEl = () => this.finalFocusButton()?.nativeElement ?? null
}
