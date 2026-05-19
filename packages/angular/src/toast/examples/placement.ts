import { ChangeDetectionStrategy, Component } from '@angular/core'
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
  selector: 'toast-placement-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkToaster, ArkToastTitle, ArkToastDescription, ArkToastCloseTrigger, ToastXIcon],
  template: `
    <div class="toast-demo">
      <button type="button" class="toast-button" (click)="show()">Show toast (top-end)</button>
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
export class ToastPlacementExample {
  readonly toaster = createToaster({ placement: 'top-end', overlap: true, gap: 16 })

  show(): void {
    this.toaster.create({
      title: 'Notification',
      description: 'This toast appears at the top-right corner.',
      type: 'info',
    })
  }
}
