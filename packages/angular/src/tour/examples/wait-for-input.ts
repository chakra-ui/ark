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
  waitForEvent,
} from '../public-api'
import { tourExampleStyles } from '../tour-example-styles'

@Component({
  selector: 'tour-wait-for-input-example',
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
      <button type="button" class="tour-button" data-variant="solid" (click)="tour.api().start()">
        Start Form Tutorial
      </button>

      <div class="tour-form">
        <div class="tour-form-field">
          <label for="input-name">Name</label>
          <input id="input-name" type="text" placeholder="Enter your name" class="tour-input" />
        </div>
        <div class="tour-form-field">
          <label for="input-email">Email</label>
          <input id="input-email" type="email" placeholder="Enter your email" class="tour-input" />
        </div>
        <div class="tour-form-field-inline">
          <input id="checkbox-terms" type="checkbox" class="tour-checkbox" />
          <label for="checkbox-terms">I accept the terms and conditions</label>
        </div>
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
export class TourWaitForInputExample {
  readonly steps: TourStepDetails[] = [
    {
      id: 'intro',
      type: 'dialog',
      title: 'Form Tutorial',
      description: 'Learn how to fill out the form by following the guided steps.',
      actions: [{ label: 'Start', action: 'next' }],
    },
    {
      id: 'enter-name',
      type: 'tooltip',
      title: 'Enter Your Name',
      description: 'Type your name in the input field to continue.',
      target: () => document.querySelector<HTMLInputElement>('#input-name'),
      effect({ next, target, show }) {
        show()
        const [promise, cancel] = waitForEvent<HTMLInputElement>(target, 'input', {
          predicate: (element) => element.value.trim().length >= 2,
        })
        promise.then(() => next()).catch(() => {})
        return cancel
      },
    },
    {
      id: 'enter-email',
      type: 'tooltip',
      title: 'Enter Your Email',
      description: 'Now enter a valid email address.',
      target: () => document.querySelector<HTMLInputElement>('#input-email'),
      effect({ next, target, show }) {
        show()
        const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/
        const [promise, cancel] = waitForEvent<HTMLInputElement>(target, 'input', {
          predicate: (element) => emailRegex.test(element.value),
        })
        promise.then(() => next()).catch(() => {})
        return cancel
      },
    },
    {
      id: 'check-terms',
      type: 'tooltip',
      title: 'Accept Terms',
      description: 'Check the checkbox to accept the terms.',
      target: () => document.querySelector<HTMLInputElement>('#checkbox-terms'),
      effect({ next, target, show }) {
        show()
        const [promise, cancel] = waitForEvent<HTMLInputElement>(target, 'change', {
          predicate: (element) => element.checked,
        })
        promise.then(() => next()).catch(() => {})
        return cancel
      },
    },
    {
      id: 'complete',
      type: 'dialog',
      title: 'Form Complete!',
      description: 'You have successfully filled out the form.',
      actions: [{ label: 'Done', action: 'dismiss' }],
    },
  ]
}
