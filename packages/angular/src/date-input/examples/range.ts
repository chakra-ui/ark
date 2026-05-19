import { ChangeDetectionStrategy, Component } from '@angular/core'
import { parseDate } from '@internationalized/date'
import {
  ArkDateInputControl,
  ArkDateInputHiddenInput,
  ArkDateInputLabel,
  ArkDateInputRoot,
  ArkDateInputSegment,
  ArkDateInputSegmentContext,
  ArkDateInputSegmentGroup,
} from '../public-api'
import { dateInputExampleStyles } from '../date-input-example-styles'

@Component({
  selector: 'date-input-range-example',
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
    <div arkDateInput name="date" selectionMode="range" [defaultValue]="range">
      <label arkDateInputLabel>Date Range</label>
      <div arkDateInputControl>
        <div arkDateInputSegmentGroup [index]="0">
          <ng-container *arkDateInputSegmentContext="let segment">
            <span arkDateInputSegment [segment]="segment"></span>
          </ng-container>
        </div>
        <span aria-hidden="true">&rarr;</span>
        <div arkDateInputSegmentGroup [index]="1">
          <ng-container *arkDateInputSegmentContext="let segment">
            <span arkDateInputSegment [segment]="segment"></span>
          </ng-container>
        </div>
      </div>
      <input arkDateInputHiddenInput [index]="0" />
      <input arkDateInputHiddenInput [index]="1" />
    </div>
  `,
  styles: [dateInputExampleStyles],
})
export class DateInputRangeExample {
  readonly range = [parseDate('2026-05-19'), parseDate('2026-05-21')]
}
