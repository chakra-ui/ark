import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import {
  ArkToaster,
  ArkToastActionTrigger,
  ArkToastCloseTrigger,
  ArkToastDescription,
  ArkToastTitle,
  createToaster,
} from '@ark-ui/angular/toast'
import { toastExampleStyles } from '../toast-example-styles'

@Component({
  selector: 'toast-action-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkToaster, ArkToastTitle, ArkToastDescription, ArkToastActionTrigger, ArkToastCloseTrigger],
  template: `
    <div class="toast-demo">
      <button type="button" class="toast-button" (click)="show()">Show action toast</button>
      <span>{{ actionCount() }} actions</span>
    </div>

    <ng-template #toastTemplate let-toast>
      <div arkToastTitle>{{ toast.title }}</div>
      <div arkToastDescription>{{ toast.description }}</div>
      <div class="toast-footer">
        @if (toast.action) {
          <button type="button" arkToastActionTrigger class="toast-action">{{ toast.action.label }}</button>
        }
        <button type="button" arkToastCloseTrigger class="toast-close">Dismiss</button>
      </div>
    </ng-template>

    <ark-toaster [toaster]="toaster" [itemTemplate]="toastTemplate" />
  `,
  styles: [toastExampleStyles],
})
export class ToastActionExample {
  readonly toaster = createToaster({ placement: 'bottom-end' })
  readonly actionCount = signal(0)

  show(): void {
    this.toaster.create({
      title: 'File archived',
      description: 'You can undo this action.',
      action: {
        label: 'Undo',
        onClick: () => this.actionCount.update((count) => count + 1),
      },
    })
  }
}
