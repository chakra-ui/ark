import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkToaster,
  ArkToastActionTrigger,
  ArkToastDescription,
  ArkToastTitle,
  createToaster,
} from '@ark-ui/angular/toast'
import { toastExampleStyles } from '../toast-example-styles'

@Component({
  selector: 'toast-action-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkToaster, ArkToastTitle, ArkToastDescription, ArkToastActionTrigger],
  template: `
    <div class="toast-demo">
      <button type="button" class="toast-button" (click)="show()">Create event</button>
    </div>

    <ng-template #toastTemplate let-toast>
      <div arkToastTitle class="Title">{{ toast.title }}</div>
      <div arkToastDescription class="Description">{{ toast.description }}</div>
      @if (toast.action) {
        <button type="button" arkToastActionTrigger class="ActionTrigger">{{ toast.action.label }}</button>
      }
    </ng-template>

    <ark-toaster [toaster]="toaster" [itemTemplate]="toastTemplate" />
  `,
  styles: [toastExampleStyles],
})
export class ToastActionExample {
  readonly toaster = createToaster({ placement: 'bottom-end', gap: 24 })

  show(): void {
    this.toaster.create({
      title: 'Event has been created',
      description: 'We have sent you an email with the event details.',
      type: 'info',
      action: {
        label: 'Undo',
        onClick: () => {
          console.log('Undo')
        },
      },
    })
  }
}
