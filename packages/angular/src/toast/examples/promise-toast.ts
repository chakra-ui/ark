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
import { ToastAlertIcon, ToastCheckIcon, ToastLoaderIcon, ToastXIcon } from './icons'

const uploadFile = (): Promise<void> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.5 ? resolve() : reject(new Error('Upload failed'))
    }, 2000)
  })

@Component({
  selector: 'toast-promise-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkToaster,
    ArkToastTitle,
    ArkToastDescription,
    ArkToastCloseTrigger,
    ToastAlertIcon,
    ToastCheckIcon,
    ToastLoaderIcon,
    ToastXIcon,
  ],
  template: `
    <div class="toast-demo">
      <button type="button" class="toast-button" (click)="handleUpload()">Upload file</button>
    </div>

    <ng-template #toastTemplate let-toast>
      <div arkToastTitle class="Title">
        @switch (iconType(toast.type)) {
          @case ('loading') {
            <toast-loader-icon class="Indicator" data-type="loading" />
          }
          @case ('success') {
            <toast-check-icon class="Indicator" />
          }
          @case ('error') {
            <toast-alert-icon class="Indicator" />
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
export class ToastPromiseExample {
  readonly toaster = createToaster({ overlap: true, placement: 'bottom-end', gap: 16 })

  handleUpload(): void {
    this.toaster.promise(uploadFile, {
      loading: {
        title: 'Uploading file...',
        description: 'Please wait while we upload your document.',
      },
      success: {
        title: 'Upload complete',
        description: 'Your file has been uploaded successfully.',
      },
      error: {
        title: 'Upload failed',
        description: 'Could not upload the file. Please try again.',
      },
    })
  }

  iconType(type: ToastType | undefined): ToastType | undefined {
    return type
  }
}
