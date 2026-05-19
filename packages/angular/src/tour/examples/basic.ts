import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import type { TourStepDetails } from '../public-api'
import {
  ArkTourActionTrigger,
  ArkTourActions,
  ArkTourBackdrop,
  ArkTourCloseTrigger,
  ArkTourContent,
  ArkTourControl,
  ArkTourDescription,
  ArkTourPositioner,
  ArkTourProgressText,
  ArkTourRoot,
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
    ArkTourPositioner,
    ArkTourContent,
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
      <button type="button" class="tour-button" (click)="tour.api().start()">Start Tour</button>

      <div class="tour-targets">
        <div id="tour-item-1" class="tour-target">Profile</div>
        <div id="tour-item-2" class="tour-target">Settings</div>
        <div id="tour-item-3" class="tour-target">Billing</div>
      </div>

      <ark-portal [originInjector]="tour.getContextCarrier().elementInjector">
        <div arkTourBackdrop class="tour-backdrop"></div>
        <div arkTourPositioner class="tour-positioner">
          <div arkTourContent class="tour-content">
            <button type="button" arkTourCloseTrigger class="tour-button" aria-label="Close">Close</button>
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
      </ark-portal>
    </div>
  `,
  styles: [tourExampleStyles],
})
export class TourBasicExample {
  readonly steps: TourStepDetails[] = [
    {
      id: 'profile',
      type: 'tooltip',
      title: 'Profile',
      description: 'Review the current user profile here.',
      target: () => document.querySelector<HTMLElement>('#tour-item-1'),
      actions: [{ label: 'Next', action: 'next' }],
    },
    {
      id: 'settings',
      type: 'tooltip',
      title: 'Settings',
      description: 'Adjust workspace preferences from this area.',
      target: () => document.querySelector<HTMLElement>('#tour-item-2'),
      actions: [
        { label: 'Back', action: 'prev' },
        { label: 'Next', action: 'next' },
      ],
    },
    {
      id: 'billing',
      type: 'tooltip',
      title: 'Billing',
      description: 'Manage plan and payment details from billing.',
      target: () => document.querySelector<HTMLElement>('#tour-item-3'),
      actions: [
        { label: 'Back', action: 'prev' },
        { label: 'Finish', action: 'dismiss' },
      ],
    },
  ]
}
