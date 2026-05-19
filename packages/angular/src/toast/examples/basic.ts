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
  selector: 'toast-basic-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkToaster, ArkToastTitle, ArkToastDescription, ArkToastCloseTrigger],
  template: `
    <div class="toast-demo">
      <button type="button" class="toast-button" (click)="show()">Show toast</button>
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
export class ToastBasicExample {
  readonly toaster = createToaster({ placement: 'bottom-end' })

  show(): void {
    this.toaster.create({
      title: 'Ready',
      description: 'Your changes have been saved.',
      duration: 4000,
    })
  }
}
