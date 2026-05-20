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
import { TourKeyboardIcon, TourSparklesIcon, TourXIcon } from './icons'

@Component({
  selector: 'tour-keyboard-navigation-example',
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
    TourKeyboardIcon,
    TourXIcon,
  ],
  template: `
    <div class="tour-root" arkTour #tour="arkTour" [steps]="steps" [keyboardNavigation]="true">
      <button type="button" class="tour-button" data-variant="surface" (click)="tour.api().start()">
        <tour-sparkles-icon />
        Start Tour
      </button>

      <p class="tour-hint">
        <tour-keyboard-icon />
        Use arrow keys to navigate, Escape to close
      </p>

      <div class="tour-targets">
        <div id="key-1" class="tour-target">Step 1</div>
        <div id="key-2" class="tour-target">Step 2</div>
        <div id="key-3" class="tour-target">Step 3</div>
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
          </div>
        </div>
      </ark-portal>
    </div>
  `,
  styles: [tourExampleStyles],
})
export class TourKeyboardNavigationExample {
  readonly steps: TourStepDetails[] = [
    {
      id: 'step-1',
      type: 'tooltip',
      title: 'Keyboard Navigation',
      description: 'Press the right arrow key (→) to go to the next step.',
      target: () => document.querySelector<HTMLElement>('#key-1'),
      actions: [{ label: 'Next', action: 'next' }],
    },
    {
      id: 'step-2',
      type: 'tooltip',
      title: 'Go Back',
      description: 'Press the left arrow key (←) to go back.',
      target: () => document.querySelector<HTMLElement>('#key-2'),
      actions: [
        { label: 'Back', action: 'prev' },
        { label: 'Next', action: 'next' },
      ],
    },
    {
      id: 'step-3',
      type: 'tooltip',
      title: 'Close Tour',
      description: 'Press Escape to close the tour at any time.',
      target: () => document.querySelector<HTMLElement>('#key-3'),
      actions: [
        { label: 'Back', action: 'prev' },
        { label: 'Finish', action: 'dismiss' },
      ],
    },
  ]
}
