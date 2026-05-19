import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import {
  ArkProgressCircle,
  ArkProgressCircleRange,
  ArkProgressCircleTrack,
  ArkProgressRoot,
  ArkProgressValueText,
} from '@ark-ui/angular/progress'
import { progressCircularExampleStyles } from '../../progress-example-styles'

@Component({
  selector: 'progress-circular-controlled-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkProgressRoot, ArkProgressCircle, ArkProgressCircleTrack, ArkProgressCircleRange, ArkProgressValueText],
  template: `
    <div arkProgress [(value)]="value">
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
export class ProgressCircularControlledExample {
  readonly value = signal<number | null | undefined>(42)
}
