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
  selector: 'date-input-disabled-example',
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
    <div arkDateInput disabled [defaultValue]="value">
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
export class DateInputDisabledExample {
  readonly value = [parseDate('2024-06-15')]
}
