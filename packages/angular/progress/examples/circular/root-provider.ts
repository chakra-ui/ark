import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkProgressCircle,
  ArkProgressCircleRange,
  ArkProgressCircleTrack,
  ArkProgressRootProvider,
  ArkProgressValueText,
  useProgress,
} from '@ark-ui/angular/progress'
import { progressCircularExampleStyles } from '../../progress-example-styles'

@Component({
  selector: 'progress-circular-root-provider-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkProgressRootProvider,
    ArkProgressCircle,
    ArkProgressCircleTrack,
    ArkProgressCircleRange,
    ArkProgressValueText,
  ],
  template: `
    <div class="stack">
      <button class="progress-button" type="button" (click)="setToMax()">Set to max</button>
      <div arkProgressRootProvider [value]="progress">
        <div class="progress-circle-container">
          <svg arkProgressCircle>
            <circle arkProgressCircleTrack></circle>
            <circle arkProgressCircleRange></circle>
          </svg>
          <span arkProgressValueText #valueText="arkProgressValueText">{{ valueText.percentAsString() }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [progressCircularExampleStyles],
})
export class ProgressCircularRootProviderExample {
  readonly progress = useProgress({ context: () => ({}) })

  setToMax() {
    this.progress.api().setToMax()
  }
}
