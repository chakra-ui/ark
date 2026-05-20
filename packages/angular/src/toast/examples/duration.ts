import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core'
import {
  ArkToaster,
  ArkToastCloseTrigger,
  ArkToastDescription,
  ArkToastTitle,
  createToaster,
} from '@ark-ui/angular/toast'
import { toastExampleStyles } from '../toast-example-styles'
import { ToastClockIcon, ToastXIcon } from './icons'

const durations = [
  { label: '1s', value: 1000 },
  { label: '3s', value: 3000 },
  { label: '5s', value: 5000 },
  { label: '∞', value: Infinity },
]

@Component({
  selector: 'toast-duration-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [ArkToaster, ArkToastTitle, ArkToastDescription, ArkToastCloseTrigger, ToastClockIcon, ToastXIcon],
  template: `
    <div class="toast-demo">
      @for (duration of durations; track duration.label) {
        <button type="button" class="toast-button" (click)="show(duration)">
          {{ duration.label }}
        </button>
      }
    </div>

    <ng-template #toastTemplate let-toast>
      <div arkToastTitle class="Title">
        <toast-clock-icon class="Indicator" />
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
export class ToastDurationExample {
  readonly toaster = createToaster({ overlap: true, placement: 'bottom-end', gap: 16 })
  readonly durations = durations

  show(duration: (typeof durations)[number]): void {
    this.toaster.create({
      title: 'Reminder set',
      description: `This notification will ${
        duration.value === Infinity ? 'stay until dismissed' : `disappear in ${duration.label}`
      }.`,
      type: 'info',
      duration: duration.value,
    })
  }
}
