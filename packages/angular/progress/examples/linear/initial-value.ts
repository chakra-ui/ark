import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkProgressLabel,
  ArkProgressRange,
  ArkProgressRoot,
  ArkProgressTrack,
  ArkProgressValueText,
} from '@ark-ui/angular/progress'
import { progressLinearExampleStyles } from '../../progress-example-styles'

@Component({
  selector: 'progress-linear-initial-value-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkProgressRoot, ArkProgressLabel, ArkProgressValueText, ArkProgressTrack, ArkProgressRange],
  template: `
    <div arkProgress [defaultValue]="70">
      <span arkProgressLabel>Label</span>
      <span arkProgressValueText #valueText="arkProgressValueText">{{ valueText.percentAsString() }}</span>
      <div arkProgressTrack>
        <div arkProgressRange></div>
      </div>
    </div>
  `,
  styles: [progressLinearExampleStyles],
})
export class ProgressLinearInitialValueExample {}
