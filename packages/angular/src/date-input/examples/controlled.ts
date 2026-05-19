import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { parseDate } from '@internationalized/date'
import {
  ArkDateInputControl,
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
    ArkDateInputControl,
    ArkDateInputSegmentGroup,
    ArkDateInputSegment,
    ArkDateInputSegmentContext,
  ],
  template: `
    <div arkDateInput [(value)]="value">
      <div arkDateInputControl>
        <div arkDateInputSegmentGroup>
          <ng-container *arkDateInputSegmentContext="let segment">
            <span arkDateInputSegment [segment]="segment"></span>
          </ng-container>
        </div>
      </div>
    </div>
    <button type="button" (click)="value.set([tomorrow])">Set value</button>
  `,
  styles: [dateInputExampleStyles],
})
export class DateInputControlledExample {
  readonly tomorrow = parseDate('2026-05-20')
  readonly value = signal<DateValue[] | undefined>([parseDate('2026-05-19')])
}
