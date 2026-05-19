import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkProgressCircle,
  ArkProgressCircleRange,
  ArkProgressCircleTrack,
  ArkProgressLabel,
  ArkProgressRoot,
  ArkProgressValueText,
} from '@ark-ui/angular/progress'
import { progressCircularExampleStyles } from '../../progress-example-styles'

@Component({
  selector: 'progress-circular-with-label-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkProgressRoot,
    ArkProgressLabel,
    ArkProgressCircle,
    ArkProgressCircleTrack,
    ArkProgressCircleRange,
    ArkProgressValueText,
  ],
  template: `
    <div arkProgress [defaultValue]="42">
      <span arkProgressLabel>Label</span>
      <div class="progress-circle-container">
        <svg arkProgressCircle>
          <circle arkProgressCircleTrack></circle>
          <circle arkProgressCircleRange></circle>
        </svg>
        <span arkProgressValueText #valueText="arkProgressValueText">{{ valueText.percentAsString() }}</span>
      </div>
    </div>
  `,
  styles: [progressCircularExampleStyles],
})
export class ProgressCircularWithLabelExample {}
