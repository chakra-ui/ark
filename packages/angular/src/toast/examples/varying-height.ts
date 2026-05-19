import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import {
  ArkToaster,
  ArkToastCloseTrigger,
  ArkToastDescription,
  ArkToastTitle,
  createToaster,
} from '@ark-ui/angular/toast'
import { toastExampleStyles } from '../toast-example-styles'
import { ToastXIcon } from './icons'

const descriptions = [
  'Your changes have been saved.',
  'File uploaded successfully. You can view it in your documents folder.',
  'Your meeting has been scheduled for tomorrow at 10:00 AM. We have sent a calendar invite to all participants.',
  'We noticed unusual activity on your account. For your security, please verify your identity by clicking the link sent to your email address.',
]

@Component({
  selector: 'toast-varying-height-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkToaster, ArkToastTitle, ArkToastDescription, ArkToastCloseTrigger, ToastXIcon],
  template: `
    <div class="toast-demo">
      <button type="button" class="toast-button" (click)="show()">Create toast</button>
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
export class ToastVaryingHeightExample {
  readonly toaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 16 })
  readonly count = signal(0)

  show(): void {
    this.count.update((value) => value + 1)
    const count = this.count()
    const description = descriptions[Math.floor(Math.random() * descriptions.length)]

    this.toaster.create({
      title: `Notification ${count}`,
      description,
      type: 'info',
    })
  }
}
