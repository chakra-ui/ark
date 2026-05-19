import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import type { TourStepDetails } from '../public-api'
import {
  ArkTourActionTrigger,
  ArkTourActions,
  ArkTourContent,
  ArkTourControl,
  ArkTourDescription,
  ArkTourProgressText,
  ArkTourRoot,
  ArkTourTitle,
} from '../public-api'
import { tourExampleStyles } from '../tour-example-styles'

@Component({
  selector: 'tour-controlled-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkTourRoot,
    ArkTourContent,
    ArkTourProgressText,
    ArkTourTitle,
    ArkTourDescription,
    ArkTourControl,
    ArkTourActions,
    ArkTourActionTrigger,
  ],
  template: `
    <div arkTour #tour="arkTour" [steps]="steps" [(stepId)]="stepId" class="tour-root">
      <button type="button" class="tour-button" (click)="tour.api().start()">Start Controlled Tour</button>
      <div arkTourContent class="tour-content">
        <div arkTourProgressText></div>
        <h2 arkTourTitle class="tour-title"></h2>
        <p arkTourDescription class="tour-description"></p>
        <div arkTourControl class="tour-control">
          <ng-template arkTourActions let-actions>
            @for (action of actions; track action.label) {
              <button type="button" arkTourActionTrigger [action]="action" class="tour-button"></button>
            }
          </ng-template>
        </div>
      </div>
    </div>
  `,
  styles: [tourExampleStyles],
})
export class TourControlledExample {
  readonly stepId = signal<string | null | undefined>(undefined)
  readonly steps: TourStepDetails[] = [
    {
      id: 'intro',
      type: 'dialog',
      title: 'Controlled Tour',
      description: 'The current step id is synchronized with an Angular signal.',
      actions: [{ label: 'Finish', action: 'dismiss' }],
    },
  ]
}
