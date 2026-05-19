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

@Component({
  selector: 'tour-skip-tour-example',
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
    <div class="tour-root" arkTour #tour="arkTour" [steps]="steps">
      <button type="button" class="tour-button" data-variant="solid" (click)="tour.api().start()">Start Tour</button>

      <div class="tour-targets">
        <div id="item-1" class="tour-target">Item 1</div>
        <div id="item-2" class="tour-target">Item 2</div>
        <div id="item-3" class="tour-target">Item 3</div>
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
export class TourSkipTourExample {
  readonly steps: TourStepDetails[] = [
    {
      id: 'step-1',
      type: 'tooltip',
      title: 'First Feature',
      description: 'You can skip this tour at any time using the Skip button.',
      target: () => document.querySelector<HTMLElement>('#item-1'),
      actions: [
        { label: 'Skip', action: 'dismiss' },
        { label: 'Next', action: 'next' },
      ],
    },
    {
      id: 'step-2',
      type: 'tooltip',
      title: 'Second Feature',
      description: 'Continue or skip to end the tour early.',
      target: () => document.querySelector<HTMLElement>('#item-2'),
      actions: [
        { label: 'Skip', action: 'dismiss' },
        { label: 'Back', action: 'prev' },
        { label: 'Next', action: 'next' },
      ],
    },
    {
      id: 'step-3',
      type: 'tooltip',
      title: 'Final Feature',
      description: 'This is the last step of the tour.',
      target: () => document.querySelector<HTMLElement>('#item-3'),
      actions: [
        { label: 'Back', action: 'prev' },
        { label: 'Finish', action: 'dismiss' },
      ],
    },
  ]
}
