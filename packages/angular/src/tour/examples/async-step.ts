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
  selector: 'tour-async-step-example',
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

      <div id="user-card" class="tour-target">User Profile Card</div>

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
export class TourAsyncStepExample {
  readonly steps: TourStepDetails[] = [
    {
      id: 'intro',
      type: 'dialog',
      title: 'Async Data Loading',
      description: 'This tour demonstrates loading data before showing a step.',
      actions: [{ label: 'Next', action: 'next' }],
    },
    {
      id: 'user-info',
      type: 'tooltip',
      title: 'Loading...',
      description: 'Fetching user data...',
      target: () => document.querySelector<HTMLElement>('#user-card'),
      actions: [
        { label: 'Back', action: 'prev' },
        { label: 'Next', action: 'next' },
      ],
      effect({ show, update }) {
        const controller = new AbortController()

        fetch('https://api.github.com/users/segunadebayo', { signal: controller.signal })
          .then((response) => response.json())
          .then((data: { followers?: number; login?: string; name?: string; public_repos?: number }) => {
            update({
              title: `Welcome, ${data.name || data.login}!`,
              description: `You have ${data.public_repos} public repositories and ${data.followers} followers.`,
            })
            show()
          })
          .catch(() => {
            update({
              title: 'User Profile',
              description: 'Could not load user data. Please try again.',
            })
            show()
          })

        return () => controller.abort()
      },
    },
    {
      id: 'complete',
      type: 'dialog',
      title: 'Tour Complete',
      description: 'The async step loaded data from the GitHub API before displaying.',
      actions: [{ label: 'Done', action: 'dismiss' }],
    },
  ]
}
