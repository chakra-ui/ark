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
  selector: 'toast-duration-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkToaster, ArkToastTitle, ArkToastDescription, ArkToastCloseTrigger],
  template: `
    <div class="toast-demo">
      <button type="button" class="toast-button" (click)="show()">Show short toast</button>
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
export class ToastDurationExample {
  readonly toaster = createToaster({ placement: 'bottom-end' })

  show(): void {
    this.toaster.create({
      title: 'Heads up',
      description: 'This toast auto-dismisses quickly.',
      duration: 1500,
    })
  }
}
