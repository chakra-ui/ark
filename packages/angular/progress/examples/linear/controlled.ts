import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import {
  ArkProgressLabel,
  ArkProgressRange,
  ArkProgressRoot,
  ArkProgressTrack,
  ArkProgressValueText,
} from '@ark-ui/angular/progress'
import { progressLinearExampleStyles } from '../../progress-example-styles'

@Component({
  selector: 'progress-linear-controlled-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkProgressRoot, ArkProgressLabel, ArkProgressValueText, ArkProgressTrack, ArkProgressRange],
  template: `
    <div arkProgress [(value)]="value">
      <span arkProgressLabel>Label</span>
      <span arkProgressValueText #valueText="arkProgressValueText">{{ valueText.percentAsString() }}</span>
      <div arkProgressTrack>
        <div arkProgressRange></div>
      </div>
    </div>
  `,
  styles: [progressLinearExampleStyles],
})
export class ProgressLinearControlledExample {
  readonly value = signal<number | null | undefined>(42)
}
