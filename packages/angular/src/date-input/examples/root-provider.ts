import { ChangeDetectionStrategy, Component, Injector, inject, runInInjectionContext } from '@angular/core'
import {
  ArkDateInputControl,
  ArkDateInputRootProvider,
  ArkDateInputSegment,
  ArkDateInputSegmentContext,
  ArkDateInputSegmentGroup,
  useDateInput,
} from '../public-api'
import { dateInputExampleStyles } from '../date-input-example-styles'

@Component({
  selector: 'date-input-root-provider-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkDateInputRootProvider,
    ArkDateInputControl,
    ArkDateInputSegmentGroup,
    ArkDateInputSegment,
    ArkDateInputSegmentContext,
  ],
  template: `
    <div arkDateInputRootProvider [value]="dateInput">
      <div arkDateInputControl>
        <div arkDateInputSegmentGroup>
          <ng-container *arkDateInputSegmentContext="let segment">
            <span arkDateInputSegment [segment]="segment"></span>
          </ng-container>
        </div>
      </div>
    </div>
  `,
  styles: [dateInputExampleStyles],
})
export class DateInputRootProviderExample {
  private readonly injector = inject(Injector)
  readonly dateInput = runInInjectionContext(this.injector, () => useDateInput({ context: () => ({}) }))
}
