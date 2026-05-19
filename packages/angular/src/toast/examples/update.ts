import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkToaster, ArkToastDescription, ArkToastTitle, createToaster } from '@ark-ui/angular/toast'
import { toastExampleStyles } from '../toast-example-styles'

@Component({
  selector: 'toast-update-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkToaster, ArkToastTitle, ArkToastDescription],
  template: `
    <div class="hstack">
      <button type="button" class="toast-button" (click)="show()">Send message</button>
      <button type="button" class="toast-button" (click)="update()">Mark as sent</button>
    </div>

    <ng-template #toastTemplate let-toast>
      <div arkToastTitle class="Title">{{ toast.title }}</div>
      <div arkToastDescription class="Description">{{ toast.description }}</div>
    </ng-template>

    <ark-toaster [toaster]="toaster" [itemTemplate]="toastTemplate" />
  `,
  styles: [toastExampleStyles],
})
export class ToastUpdateExample {
  readonly toaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 24 })
  private toastId: string | undefined

  show(): void {
    this.toastId = this.toaster.create({
      title: 'Sending message...',
      description: 'Please wait while we deliver your message.',
      type: 'loading',
    })
  }

  update(): void {
    if (!this.toastId) return
    this.toaster.update(this.toastId, {
      title: 'Message sent',
      description: 'Your message has been delivered successfully.',
      type: 'success',
    })
  }
}
