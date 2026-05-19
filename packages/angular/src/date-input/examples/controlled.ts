import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { parseDate } from '@internationalized/date'
import {
  ArkDateInputControl,
  ArkDateInputHiddenInput,
  ArkDateInputLabel,
  ArkDateInputRoot,
  ArkDateInputSegment,
  ArkDateInputSegmentContext,
  ArkDateInputSegmentGroup,
  type DateValue,
} from '../public-api'
import { dateInputExampleStyles } from '../date-input-example-styles'

@Component({
  selector: 'date-input-controlled-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkDateInputRoot,
    ArkDateInputLabel,
    ArkDateInputControl,
    ArkDateInputSegmentGroup,
    ArkDateInputSegment,
    ArkDateInputSegmentContext,
    ArkDateInputHiddenInput,
  ],
  template: `
    <div arkDateInput [(value)]="value">
      <label arkDateInputLabel>Date</label>
      <div arkDateInputControl>
        <div arkDateInputSegmentGroup>
          <ng-container *arkDateInputSegmentContext="let segment">
            <span arkDateInputSegment [segment]="segment"></span>
          </ng-container>
        </div>
      </div>
      <input arkDateInputHiddenInput />
    </div>
  `,
  styles: [dateInputExampleStyles],
})
export class DateInputControlledExample {
  readonly value = signal<DateValue[] | undefined>([parseDate('2026-05-19')])
}
