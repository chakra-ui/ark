import { ChangeDetectionStrategy, Component, Injector, inject, runInInjectionContext } from '@angular/core'
import {
  ArkStepsCompletedContent,
  ArkStepsContent,
  ArkStepsContext,
  ArkStepsIndicator,
  ArkStepsItem,
  ArkStepsList,
  ArkStepsNextTrigger,
  ArkStepsPrevTrigger,
  ArkStepsRootProvider,
  ArkStepsSeparator,
  ArkStepsTrigger,
  useSteps,
} from '@ark-ui/angular/steps'
import { stepsExampleStyles } from '../steps-example-styles'
import { stepExampleItems } from './_data'

@Component({
  selector: 'steps-root-provider-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkStepsRootProvider,
    ArkStepsContext,
    ArkStepsList,
    ArkStepsItem,
    ArkStepsTrigger,
    ArkStepsIndicator,
    ArkStepsSeparator,
    ArkStepsContent,
    ArkStepsCompletedContent,
    ArkStepsPrevTrigger,
    ArkStepsNextTrigger,
  ],
  template: `
    <div arkStepsRootProvider class="steps-root" [value]="steps">
      <ng-container *arkStepsContext="let api">
        <output>current step: {{ api().value + 1 }}</output>
      </ng-container>

      <ol arkStepsList class="steps-list">
        @for (item of items; track item.title; let index = $index) {
          <li arkStepsItem class="steps-item" [index]="index">
            <button arkStepsTrigger class="steps-trigger">
              <span arkStepsIndicator class="steps-indicator">{{ index + 1 }}</span>
              <span>{{ item.title }}</span>
            </button>
            <span arkStepsSeparator class="steps-separator"></span>
          </li>
        }
      </ol>

      @for (item of items; track item.title; let index = $index) {
        <div arkStepsContent class="steps-content" [index]="index">{{ item.title }} - {{ item.description }}</div>
      }

      <div arkStepsCompletedContent class="steps-completed">Steps Complete - thank you.</div>

      <div class="steps-actions">
        <button arkStepsPrevTrigger class="steps-button">Back</button>
        <button arkStepsNextTrigger class="steps-button" data-variant="solid">Next</button>
      </div>
    </div>
  `,
  styles: [stepsExampleStyles],
})
export class StepsRootProviderExample {
  private readonly injector = inject(Injector)
  readonly items = stepExampleItems
  readonly steps = runInInjectionContext(this.injector, () =>
    useSteps({ context: () => ({ count: this.items.length }) }),
  )
}
