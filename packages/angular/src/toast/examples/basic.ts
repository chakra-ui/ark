import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core'
import {
  ArkToaster,
  ArkToastCloseTrigger,
  ArkToastDescription,
  ArkToastTitle,
  createToaster,
} from '@ark-ui/angular/toast'
import { toastExampleStyles } from '../toast-example-styles'
import { ToastXIcon } from './icons'

@Component({
  selector: 'toast-basic-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [ArkToaster, ArkToastTitle, ArkToastDescription, ArkToastCloseTrigger, ToastXIcon],
  template: `
    <div class="toast-demo">
      <button type="button" class="toast-button" (click)="show()">Schedule meeting</button>
    </div>

    <ng-template #toastTemplate let-toast>
      <div arkToastTitle class="Title">{{ toast.title }}</div>
      <div arkToastDescription class="Description">{{ toast.description }}</div>
      <button type="button" arkToastCloseTrigger class="CloseTrigger" aria-label="Close">
        <toast-x-icon />
      </button>
    </ng-template>

    <ark-toaster [toaster]="toaster" [itemTemplate]="toastTemplate" />
  `,
  styles: [toastExampleStyles],
})
export class ToastBasicExample {
  readonly toaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 24 })

  show(): void {
    this.toaster.create({
      title: 'Scheduled for tomorrow',
      description: 'Your meeting has been scheduled for tomorrow at 10am.',
      type: 'info',
    })
  }
}
