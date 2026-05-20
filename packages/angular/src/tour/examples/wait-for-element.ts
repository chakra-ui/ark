import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
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
  waitForElement,
  waitForEvent,
} from '../public-api'
import { tourExampleStyles } from '../tour-example-styles'
import { TourPlusIcon, TourSparklesIcon, TourXIcon } from './icons'

@Component({
  selector: 'tour-wait-for-element-example',
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
    TourPlusIcon,
    TourXIcon,
  ],
  template: `
    <div class="tour-root" arkTour #tour="arkTour" [steps]="steps">
      <button type="button" class="tour-button" data-variant="surface" (click)="tour.api().start()">
        <tour-sparkles-icon />
        Start Tour
      </button>

      <button id="btn-add-item" type="button" class="tour-button" (click)="addItem()">
        <tour-plus-icon />
        Add Item
      </button>

      <div class="tour-list">
        @for (item of items(); track item; let index = $index) {
          <div
            class="tour-list-item"
            [attr.data-item]="index === items().length - 1 && items().length > 2 ? 'new' : null"
          >
            {{ item }}
          </div>
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
export class TourWaitForElementExample {
  readonly items = signal(['Item 1', 'Item 2'])
  readonly steps: TourStepDetails[] = [
    {
      id: 'intro',
      type: 'dialog',
      title: 'Dynamic Elements',
      description: 'This tour demonstrates waiting for elements that appear dynamically.',
      actions: [{ label: 'Start', action: 'next' }],
    },
    {
      id: 'add-item',
      type: 'tooltip',
      title: 'Add an Item',
      description: 'Click the button to add a new item to the list.',
      target: () => document.querySelector<HTMLElement>('#btn-add-item'),
      effect({ next, target, show }) {
        show()
        const [promise, cancel] = waitForEvent(target, 'click')
        promise.then(() => next()).catch(() => {})
        return cancel
      },
    },
    {
      id: 'new-item',
      type: 'tooltip',
      title: 'New Item Added!',
      description: 'The tour waited for this element to appear before showing this step.',
      target: () => document.querySelector<HTMLElement>('[data-item="new"]'),
      effect({ show }) {
        const [promise, cancel] = waitForElement(() => document.querySelector<HTMLElement>('[data-item="new"]'), {
          timeout: 5000,
        })
        promise.then(() => show()).catch(() => {})
        return () => cancel()
      },
      actions: [{ label: 'Next', action: 'next' }],
    },
    {
      id: 'complete',
      type: 'dialog',
      title: 'Tour Complete',
      description: 'You learned how to use waitForElement for dynamic content.',
      actions: [{ label: 'Done', action: 'dismiss' }],
    },
  ]

  addItem(): void {
    this.items.update((items) => [...items, `Item ${items.length + 1}`])
  }
}
