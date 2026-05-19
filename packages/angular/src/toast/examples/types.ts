import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkToaster,
  ArkToastCloseTrigger,
  ArkToastDescription,
  ArkToastTitle,
  createToaster,
  type ToastType,
} from '@ark-ui/angular/toast'
import { toastExampleStyles } from '../toast-example-styles'
import { ToastAlertIcon, ToastCheckIcon, ToastInfoIcon, ToastWarningIcon, ToastXIcon } from './icons'

@Component({
  selector: 'toast-types-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkToaster,
    ArkToastTitle,
    ArkToastDescription,
    ArkToastCloseTrigger,
    ToastAlertIcon,
    ToastCheckIcon,
    ToastInfoIcon,
    ToastWarningIcon,
    ToastXIcon,
  ],
  template: `
    <div class="toast-demo">
      <button type="button" class="toast-button" (click)="success()">Success</button>
      <button type="button" class="toast-button" (click)="error()">Error</button>
      <button type="button" class="toast-button" (click)="warning()">Warning</button>
      <button type="button" class="toast-button" (click)="info()">Info</button>
    </div>

    <ng-template #toastTemplate let-toast>
      <div arkToastTitle class="Title">
        @switch (iconType(toast.type)) {
          @case ('success') {
            <toast-check-icon class="Indicator" />
          }
          @case ('error') {
            <toast-alert-icon class="Indicator" />
          }
          @case ('warning') {
            <toast-warning-icon class="Indicator" />
          }
          @case ('info') {
            <toast-info-icon class="Indicator" />
          }
        }
        {{ toast.title }}
      </div>
      <div arkToastDescription class="Description">{{ toast.description }}</div>
      <button type="button" arkToastCloseTrigger class="CloseTrigger" aria-label="Close">
        <toast-x-icon />
      </button>
    </ng-template>

    <ark-toaster [toaster]="toaster" [itemTemplate]="toastTemplate" />
  `,
  styles: [toastExampleStyles],
})
export class ToastTypesExample {
  readonly toaster = createToaster({ overlap: true, placement: 'bottom-end', gap: 16 })

  success(): void {
    this.toaster.success({ title: 'Changes saved', description: 'Your profile has been updated successfully.' })
  }

  error(): void {
    this.toaster.error({ title: 'Upload failed', description: 'There was an error uploading your file.' })
  }

  warning(): void {
    this.toaster.warning({ title: 'Low storage', description: 'You have less than 10% storage remaining.' })
  }

  info(): void {
    this.toaster.info({ title: 'Update available', description: 'A new version of the app is ready to install.' })
  }

  iconType(type: ToastType | undefined): ToastType | undefined {
    return type
  }
}
