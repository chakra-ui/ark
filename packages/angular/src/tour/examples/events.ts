import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import type { TourStatusChangeDetails, TourStepChangeDetails, TourStepDetails } from '../public-api'
import {
  ArkTourActionTrigger,
  ArkTourActions,
  ArkTourArrow,
  ArkTourArrowTip,
  ArkTourBackdrop,
  ArkTourCloseTrigger,
  ArkTourContent,
  ArkTourControl,
  ArkTourDescription,
  ArkTourPositioner,
  ArkTourProgressText,
  ArkTourRoot,
  ArkTourSpotlight,
  ArkTourTitle,
} from '../public-api'
import { tourExampleStyles } from '../tour-example-styles'

@Component({
  selector: 'tour-events-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkPortalComponent,
    ArkTourRoot,
    ArkTourBackdrop,
    ArkTourSpotlight,
    ArkTourPositioner,
    ArkTourContent,
    ArkTourArrow,
    ArkTourArrowTip,
    ArkTourCloseTrigger,
    ArkTourProgressText,
    ArkTourTitle,
    ArkTourDescription,
    ArkTourControl,
    ArkTourActions,
    ArkTourActionTrigger,
  ],
  template: `
    <div
      class="tour-root"
      arkTour
      #tour="arkTour"
      [steps]="steps"
      (stepChange)="addStepLog($event)"
      (statusChange)="addStatusLog($event)"
    >
      <button type="button" class="tour-button" data-variant="solid" (click)="tour.api().start()">Start Tour</button>

      <div class="tour-targets">
        <div id="event-1" class="tour-target">Step 1</div>
        <div id="event-2" class="tour-target">Step 2</div>
        <div id="event-3" class="tour-target">Step 3</div>
      </div>

      <div class="tour-event-log">
        <strong>Event Log:</strong>
        @if (logs().length === 0) {
          <div class="tour-event-log-item">Start the tour to see events</div>
        } @else {
          @for (log of logs(); track $index) {
            <div class="tour-event-log-item">{{ log }}</div>
          }
        }
      </div>

      <ark-portal [originInjector]="tour.getContextCarrier().elementInjector">
        <div arkTourBackdrop class="tour-backdrop"></div>
        <div arkTourSpotlight class="tour-spotlight"></div>
        <div arkTourPositioner class="tour-positioner">
          <div arkTourContent class="tour-content">
            <div arkTourArrow class="tour-arrow">
              <div arkTourArrowTip class="tour-arrow-tip"></div>
            </div>
            <button type="button" arkTourCloseTrigger class="tour-close-trigger" aria-label="Close">x</button>
            <div arkTourProgressText class="tour-progress-text"></div>
            <h2 arkTourTitle class="tour-title"></h2>
            <p arkTourDescription class="tour-description"></p>
            <div arkTourControl class="tour-control">
              <ng-template arkTourActions let-actions>
                @for (action of actions; track action.label) {
                  <button type="button" arkTourActionTrigger [action]="action" class="tour-action-trigger"></button>
                }
              </ng-template>
            </div>
          </div>
        </div>
      </ark-portal>
    </div>
  `,
  styles: [tourExampleStyles],
})
export class TourEventsExample {
  readonly logs = signal<string[]>([])
  readonly steps: TourStepDetails[] = [
    {
      id: 'step-1',
      type: 'tooltip',
      title: 'First Step',
      description: 'Watch the event log below as you navigate.',
      target: () => document.querySelector<HTMLElement>('#event-1'),
      actions: [{ label: 'Next', action: 'next' }],
    },
    {
      id: 'step-2',
      type: 'tooltip',
      title: 'Second Step',
      description: 'Each step change triggers an event.',
      target: () => document.querySelector<HTMLElement>('#event-2'),
      actions: [
        { label: 'Back', action: 'prev' },
        { label: 'Next', action: 'next' },
      ],
    },
    {
      id: 'step-3',
      type: 'tooltip',
      title: 'Final Step',
      description: 'Complete the tour to see the status change.',
      target: () => document.querySelector<HTMLElement>('#event-3'),
      actions: [
        { label: 'Back', action: 'prev' },
        { label: 'Finish', action: 'dismiss' },
      ],
    },
  ]

  addStepLog(details: TourStepChangeDetails): void {
    this.logs.update((logs) => [...logs, `Step changed: ${details.stepId}`])
  }

  addStatusLog(details: TourStatusChangeDetails): void {
    this.logs.update((logs) => [...logs, `Status: ${details.status}`])
  }
}
