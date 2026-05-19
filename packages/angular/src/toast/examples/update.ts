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
  selector: 'toast-update-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkToaster, ArkToastTitle, ArkToastDescription, ArkToastCloseTrigger],
  template: `
    <div class="toast-demo">
      <button type="button" class="toast-button" (click)="show()">Create</button>
      <button type="button" class="toast-button" (click)="update()">Update</button>
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
export class ToastUpdateExample {
  readonly toaster = createToaster({ placement: 'bottom-end' })
  private toastId = 'upload-toast'

  show(): void {
    this.toaster.create({
      id: this.toastId,
      title: 'Uploading',
      description: 'Upload in progress.',
      type: 'loading',
    })
  }

  update(): void {
    this.toaster.update(this.toastId, {
      title: 'Upload complete',
      description: 'The file is available now.',
      type: 'success',
      duration: 3000,
    })
  }
}
