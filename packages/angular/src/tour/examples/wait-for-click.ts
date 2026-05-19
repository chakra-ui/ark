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
  selector: 'tour-wait-for-click-example',
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
    <div arkTour #tour="arkTour" [steps]="steps" class="tour-root">
      <button type="button" class="tour-button" data-variant="solid" (click)="tour.api().start()">
        Start Interactive Tour
      </button>

      <div class="tour-targets">
        <button id="btn-add" type="button" class="tour-button">Add Item</button>
        <button id="btn-edit" type="button" class="tour-button">Edit</button>
        <button id="btn-delete" type="button" class="tour-button">Delete</button>
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
export class TourWaitForClickExample {
  readonly steps: TourStepDetails[] = [
    {
      id: 'intro',
      type: 'dialog',
      title: 'Interactive Tutorial',
      description: 'This tour will guide you through actions. You must complete each step to proceed.',
      actions: [{ label: 'Begin', action: 'next' }],
    },
    {
      id: 'click-add',
      type: 'tooltip',
      title: 'Click the Add Button',
      description: 'Click the "Add Item" button to continue.',
      target: () => document.querySelector<HTMLElement>('#btn-add'),
      effect({ next, show, target }) {
        show()
        const [promise, cancel] = waitForEvent(target, 'click')
        let cancelled = false
        promise
          .then(() => {
            if (!cancelled) next()
          })
          .catch(() => {})
        return () => {
          cancelled = true
          cancel()
        }
      },
    },
    {
      id: 'click-edit',
      type: 'tooltip',
      title: 'Click the Edit Button',
      description: 'Now click the "Edit" button.',
      target: () => document.querySelector<HTMLElement>('#btn-edit'),
      effect({ next, show, target }) {
        show()
        const [promise, cancel] = waitForEvent(target, 'click')
        let cancelled = false
        promise
          .then(() => {
            if (!cancelled) next()
          })
          .catch(() => {})
        return () => {
          cancelled = true
          cancel()
        }
      },
    },
    {
      id: 'click-delete',
      type: 'tooltip',
      title: 'Click the Delete Button',
      description: 'Finally, click the "Delete" button.',
      target: () => document.querySelector<HTMLElement>('#btn-delete'),
      effect({ next, show, target }) {
        show()
        const [promise, cancel] = waitForEvent(target, 'click')
        let cancelled = false
        promise
          .then(() => {
            if (!cancelled) next()
          })
          .catch(() => {})
        return () => {
          cancelled = true
          cancel()
        }
      },
    },
    {
      id: 'complete',
      type: 'dialog',
      title: 'Well Done!',
      description: 'You completed all the interactive steps.',
      actions: [{ label: 'Finish', action: 'dismiss' }],
    },
  ]
}
