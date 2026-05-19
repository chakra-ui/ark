import { ChangeDetectionStrategy, Component } from '@angular/core'
import { provideArkLocale } from '@ark-ui/angular/providers/locale'
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
  selector: 'date-input-localized-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideArkLocale({ locale: 'fr-FR' })],
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
    <div arkDateInput granularity="minute" [hourCycle]="24">
      <label arkDateInputLabel>Date et heure</label>
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
export class DateInputLocalizedExample {}
