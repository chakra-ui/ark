import { ChangeDetectionStrategy, Component } from '@angular/core'
import { parseDate } from '@internationalized/date'
import {
  ArkDateInputControl,
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
    ArkDateInputControl,
    ArkDateInputSegmentGroup,
    ArkDateInputSegment,
    ArkDateInputSegmentContext,
  ],
  template: `
    <div arkDateInput selectionMode="range" [defaultValue]="range">
      <div arkDateInputControl>
        <div arkDateInputSegmentGroup [index]="0">
          <ng-container *arkDateInputSegmentContext="let segment">
            <span arkDateInputSegment [segment]="segment"></span>
          </ng-container>
        </div>
        <span aria-hidden="true">-</span>
        <div arkDateInputSegmentGroup [index]="1">
          <ng-container *arkDateInputSegmentContext="let segment">
            <span arkDateInputSegment [segment]="segment"></span>
          </ng-container>
        </div>
      </div>
    </div>
  `,
  styles: [dateInputExampleStyles],
})
export class DateInputRangeExample {
  readonly range = [parseDate('2026-05-19'), parseDate('2026-05-21')]
}
