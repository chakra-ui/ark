import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkProgressCircle,
  ArkProgressCircleRange,
  ArkProgressCircleTrack,
  ArkProgressRoot,
  ArkProgressValueText,
} from '@ark-ui/angular/progress'
import { progressCircularExampleStyles } from '../../progress-example-styles'

@Component({
  selector: 'progress-circular-min-max-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkProgressRoot, ArkProgressCircle, ArkProgressCircleTrack, ArkProgressCircleRange, ArkProgressValueText],
  template: `
    <div arkProgress [defaultValue]="20" [min]="10" [max]="30">
      <div class="progress-circle-container">
        <svg arkProgressCircle>
          <circle arkProgressCircleTrack></circle>
          <circle arkProgressCircleRange></circle>
        </svg>
        <span arkProgressValueText></span>
      </div>
    </div>
  `,
  styles: [progressCircularExampleStyles],
})
export class ProgressCircularMinMaxExample {}
