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
} from '../public-api'
import { dateInputExampleStyles } from '../date-input-example-styles'

@Component({
  selector: 'date-input-leading-zeros-example',
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
    <div class="date-input-stack">
      <label class="date-input-checkbox-label">
        <input
          class="date-input-checkbox"
          type="checkbox"
          [checked]="shouldForceLeadingZeros()"
          (change)="shouldForceLeadingZeros.set($any($event.target).checked)"
        />
        Force leading zeros
      </label>
      <div arkDateInput [defaultValue]="value" [shouldForceLeadingZeros]="shouldForceLeadingZeros()">
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
    </div>
  `,
  styles: [dateInputExampleStyles],
})
export class DateInputLeadingZerosExample {
  readonly shouldForceLeadingZeros = signal(true)
  readonly value = [parseDate('2024-06-05')]
}
