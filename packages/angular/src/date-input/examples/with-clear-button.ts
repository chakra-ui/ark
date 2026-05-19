import { ChangeDetectionStrategy, Component, Injector, inject, runInInjectionContext } from '@angular/core'
import {
  ArkDateInputControl,
  ArkDateInputHiddenInput,
  ArkDateInputLabel,
  ArkDateInputRootProvider,
  ArkDateInputSegment,
  ArkDateInputSegmentContext,
  ArkDateInputSegmentGroup,
  useDateInput,
} from '../public-api'
import { dateInputExampleStyles } from '../date-input-example-styles'
import { DateInputXIcon } from './icons'

@Component({
  selector: 'date-input-with-clear-button-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkDateInputRootProvider,
    ArkDateInputLabel,
    ArkDateInputControl,
    ArkDateInputSegmentGroup,
    ArkDateInputSegment,
    ArkDateInputSegmentContext,
    ArkDateInputHiddenInput,
    DateInputXIcon,
  ],
  template: `
    <div arkDateInputRootProvider [value]="dateInput">
      <label arkDateInputLabel>Date</label>
      <div arkDateInputControl>
        <div arkDateInputSegmentGroup>
          <ng-container *arkDateInputSegmentContext="let segment">
            <span arkDateInputSegment [segment]="segment"></span>
          </ng-container>
        </div>
        <button
          class="date-input-clear-button"
          type="button"
          aria-label="Clear date"
          (click)="dateInput.api().clearValue()"
        >
          <date-input-x-icon />
        </button>
      </div>
      <input arkDateInputHiddenInput />
    </div>
  `,
  styles: [dateInputExampleStyles],
})
export class DateInputWithClearButtonExample {
  private readonly injector = inject(Injector)
  readonly dateInput = runInInjectionContext(this.injector, () => useDateInput({ context: () => ({}) }))
}
