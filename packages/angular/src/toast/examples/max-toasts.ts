import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkToaster,
  ArkToastCloseTrigger,
  ArkToastDescription,
  ArkToastTitle,
  createToaster,
} from '@ark-ui/angular/toast'
import { toastExampleStyles } from '../toast-example-styles'

@Component({
  selector: 'toast-max-toasts-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkToaster, ArkToastTitle, ArkToastDescription, ArkToastCloseTrigger],
  template: `
    <div class="toast-demo">
      <button type="button" class="toast-button" (click)="show()">Add toast</button>
    </div>

    <ng-template #toastTemplate let-toast>
      <div arkToastTitle>{{ toast.title }}</div>
      <div arkToastDescription>{{ toast.description }}</div>
      <div class="toast-footer">
        <button type="button" arkToastCloseTrigger class="toast-close">Dismiss</button>
      </div>
    </ng-template>

    <ark-toaster [toaster]="toaster" [itemTemplate]="toastTemplate" />
  `,
  styles: [toastExampleStyles],
})
export class ToastMaxToastsExample {
  readonly toaster = createToaster({ max: 3, placement: 'bottom-end' })
  private count = 0

  show(): void {
    this.count += 1
    this.toaster.create({
      title: `Toast ${this.count}`,
      description: 'Only three toasts are visible at once.',
    })
  }
}
