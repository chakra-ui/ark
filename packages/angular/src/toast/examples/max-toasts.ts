import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkToaster,
  ArkToastCloseTrigger,
  ArkToastDescription,
  ArkToastTitle,
  createToaster,
} from '@ark-ui/angular/toast'
import { toastExampleStyles } from '../toast-example-styles'
import { ToastInfoIcon, ToastXIcon } from './icons'

@Component({
  selector: 'toast-max-toasts-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkToaster, ArkToastTitle, ArkToastDescription, ArkToastCloseTrigger, ToastInfoIcon, ToastXIcon],
  template: `
    <div class="toast-demo">
      <button type="button" class="toast-button" (click)="show()">Add notification</button>
      <button type="button" class="toast-button" (click)="showMany()">Add 5 notifications</button>
    </div>

    <ng-template #toastTemplate let-toast>
      <toast-info-icon class="Indicator" />
      <div class="toast-inline-content">
        <div arkToastTitle class="Title">{{ toast.title }}</div>
        <div arkToastDescription class="Description">{{ toast.description }}</div>
      </div>
      <button type="button" arkToastCloseTrigger class="CloseTrigger" aria-label="Close">
        <toast-x-icon />
      </button>
    </ng-template>

    <ark-toaster [toaster]="toaster" [itemTemplate]="toastTemplate" />
  `,
  styles: [toastExampleStyles],
})
export class ToastMaxToastsExample {
  readonly toaster = createToaster({ max: 3, overlap: true, placement: 'bottom-end', gap: 16 })

  show(): void {
    this.toaster.create({
      title: 'New notification',
      description: 'You have a new message in your inbox.',
      type: 'info',
    })
  }

  showMany(): void {
    const messages = [
      'John liked your post',
      'Sarah commented on your photo',
      'New follower: @designpro',
      'Your post was shared 10 times',
      'Meeting reminder in 15 minutes',
    ]

    messages.forEach((description) => {
      this.toaster.create({
        title: 'Notification',
        description,
        type: 'info',
      })
    })
  }
}
