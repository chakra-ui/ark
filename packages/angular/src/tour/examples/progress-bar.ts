import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import type { TourStepDetails } from '../public-api'
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
import { TourSparklesIcon, TourXIcon } from './icons'

@Component({
  selector: 'tour-progress-bar-example',
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
    TourSparklesIcon,
    TourXIcon,
  ],
  template: `
    <div class="tour-root" arkTour #tour="arkTour" [steps]="steps">
      <button type="button" class="tour-button" data-variant="surface" (click)="tour.api().start()">
        <tour-sparkles-icon />
        Start Tour
      </button>

      <div class="tour-targets">
        <div id="progress-1" class="tour-target">Step 1</div>
        <div id="progress-2" class="tour-target">Step 2</div>
        <div id="progress-3" class="tour-target">Step 3</div>
        <div id="progress-4" class="tour-target">Step 4</div>
      </div>

      <ark-portal [originInjector]="tour.getContextCarrier().elementInjector">
        <div arkTourBackdrop class="tour-backdrop"></div>
        <div arkTourSpotlight class="tour-spotlight"></div>
        <div arkTourPositioner class="tour-positioner">
          <div arkTourContent class="tour-content">
            <div arkTourArrow class="tour-arrow">
              <div arkTourArrowTip class="tour-arrow-tip"></div>
            </div>
            <button type="button" arkTourCloseTrigger class="tour-close-trigger" aria-label="Close">
              <tour-x-icon />
            </button>
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
            <div class="tour-progress-bar-bottom">
              <div class="tour-progress-fill" [style.width.%]="tour.api().getProgressPercent()"></div>
            </div>
          </div>
        </div>
      </ark-portal>
    </div>
  `,
  styles: [tourExampleStyles],
})
export class TourProgressBarExample {
  readonly steps: TourStepDetails[] = [
    {
      id: 'step-1',
      type: 'tooltip',
      title: 'Progress Tracking',
      description: 'Watch the progress bar at the bottom as you navigate.',
      target: () => document.querySelector<HTMLElement>('#progress-1'),
      actions: [{ label: 'Next', action: 'next' }],
    },
    {
      id: 'step-2',
      type: 'tooltip',
      title: 'Halfway There',
      description: 'The progress bar shows how far along you are.',
      target: () => document.querySelector<HTMLElement>('#progress-2'),
      actions: [
        { label: 'Back', action: 'prev' },
        { label: 'Next', action: 'next' },
      ],
    },
    {
      id: 'step-3',
      type: 'tooltip',
      title: 'Almost Done',
      description: 'One more step to complete the tour.',
      target: () => document.querySelector<HTMLElement>('#progress-3'),
      actions: [
        { label: 'Back', action: 'prev' },
        { label: 'Next', action: 'next' },
      ],
    },
    {
      id: 'step-4',
      type: 'tooltip',
      title: 'Complete!',
      description: 'You have completed all the steps.',
      target: () => document.querySelector<HTMLElement>('#progress-4'),
      actions: [
        { label: 'Back', action: 'prev' },
        { label: 'Finish', action: 'dismiss' },
      ],
    },
  ]
}
