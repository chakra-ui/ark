import { ChangeDetectionStrategy, Component } from '@angular/core'
import type { TourStepDetails } from '../public-api'
import {
  ArkTourActionTrigger,
  ArkTourActions,
  ArkTourContent,
  ArkTourControl,
  ArkTourDescription,
  ArkTourRoot,
  ArkTourTitle,
  waitForEvent,
} from '../public-api'
import { tourExampleStyles } from '../tour-example-styles'

@Component({
  selector: 'tour-wait-for-click-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkTourRoot,
    ArkTourContent,
    ArkTourTitle,
    ArkTourDescription,
    ArkTourControl,
    ArkTourActions,
    ArkTourActionTrigger,
  ],
  template: `
    <div arkTour #tour="arkTour" [steps]="steps" class="tour-root">
      <button type="button" class="tour-button" (click)="tour.api().start()">Start Interactive Tour</button>
      <button id="tour-save-button" type="button" class="tour-button">Save</button>
      <div arkTourContent class="tour-content">
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
  `,
  styles: [tourExampleStyles],
})
export class TourWaitForClickExample {
  readonly steps: TourStepDetails[] = [
    {
      id: 'intro',
      type: 'dialog',
      title: 'Interactive Tour',
      description: 'Click next, then use the Save button to continue.',
      actions: [{ label: 'Next', action: 'next' }],
    },
    {
      id: 'save',
      type: 'wait',
      title: 'Save Your Work',
      description: 'Click Save to finish this step.',
      target: () => document.querySelector<HTMLElement>('#tour-save-button'),
      effect({ next, show, target }) {
        show()
        const [promise, cancel] = waitForEvent(target, 'click')
        promise.then(() => next())
        return cancel
      },
    },
    {
      id: 'done',
      type: 'dialog',
      title: 'Done',
      description: 'The click was observed and the tour advanced.',
      actions: [{ label: 'Finish', action: 'dismiss' }],
    },
  ]
}
