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
  selector: 'tour-basic-example',
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
        <button id="btn-upload" type="button" class="tour-button">Upload</button>
        <button id="btn-save" type="button" class="tour-button">Save</button>
        <button id="btn-more" type="button" class="tour-button">More</button>
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
export class TourBasicExample {
  readonly steps: TourStepDetails[] = [
    {
      id: 'welcome',
      type: 'dialog',
      title: 'Welcome to the App!',
      description: "Let's take a quick tour to get you started with the main features.",
      actions: [{ label: 'Start Tour', action: 'next' }],
    },
    {
      id: 'upload',
      type: 'tooltip',
      title: 'Upload Files',
      description: 'Click here to upload your files to the cloud.',
      target: () => document.querySelector<HTMLElement>('#btn-upload'),
      actions: [
        { label: 'Back', action: 'prev' },
        { label: 'Next', action: 'next' },
      ],
    },
    {
      id: 'save',
      type: 'tooltip',
      title: 'Save Changes',
      description: 'Save your work to keep your progress.',
      target: () => document.querySelector<HTMLElement>('#btn-save'),
      actions: [
        { label: 'Back', action: 'prev' },
        { label: 'Next', action: 'next' },
      ],
    },
    {
      id: 'more',
      type: 'tooltip',
      title: 'More Options',
      description: 'Access additional settings and actions from this menu.',
      target: () => document.querySelector<HTMLElement>('#btn-more'),
      actions: [
        { label: 'Back', action: 'prev' },
        { label: 'Next', action: 'next' },
      ],
    },
    {
      id: 'complete',
      type: 'dialog',
      title: "You're all set!",
      description: 'You now know the basics. Enjoy using the app!',
      actions: [{ label: 'Finish', action: 'dismiss' }],
    },
  ]
}
