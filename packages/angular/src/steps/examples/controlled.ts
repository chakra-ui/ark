import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import {
  ArkStepsCompletedContent,
  ArkStepsContent,
  ArkStepsIndicator,
  ArkStepsItem,
  ArkStepsList,
  ArkStepsNextTrigger,
  ArkStepsPrevTrigger,
  ArkStepsRoot,
  ArkStepsSeparator,
  ArkStepsTrigger,
} from '@ark-ui/angular/steps'
import { stepsExampleStyles } from '../steps-example-styles'
import { stepExampleItems } from './_data'

@Component({
  selector: 'steps-controlled-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkStepsRoot,
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
    <div class="stack">
      <output>current step: {{ step() + 1 }}</output>

      <div arkSteps class="steps-root" [count]="items.length" [(step)]="step">
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

        <div arkStepsCompletedContent class="steps-completed">Steps Complete - Thank you for filling out the form!</div>

        <div class="steps-actions">
          <button arkStepsPrevTrigger class="steps-button">Back</button>
          <button arkStepsNextTrigger class="steps-button" data-variant="solid">Next</button>
        </div>
      </div>
    </div>
  `,
  styles: [stepsExampleStyles],
})
export class StepsControlledExample {
  readonly items = stepExampleItems
  readonly step = signal(0)
}
