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
  selector: 'progress-linear-min-max-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkProgressRoot, ArkProgressLabel, ArkProgressValueText, ArkProgressTrack, ArkProgressRange],
  template: `
    <div arkProgress [defaultValue]="20" [min]="10" [max]="30">
      <span arkProgressLabel>Label</span>
      <span arkProgressValueText></span>
      <div arkProgressTrack>
        <div arkProgressRange></div>
      </div>
    </div>
  `,
  styles: [progressLinearExampleStyles],
})
export class ProgressLinearMinMaxExample {}
