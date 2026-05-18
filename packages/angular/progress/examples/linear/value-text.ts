import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkProgressLabel,
  ArkProgressRange,
  ArkProgressRootProvider,
  ArkProgressTrack,
  ArkProgressValueText,
  useProgress,
} from '@ark-ui/angular/progress'
import { progressLinearExampleStyles } from '../../progress-example-styles'

@Component({
  selector: 'progress-linear-value-text-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkProgressRootProvider, ArkProgressLabel, ArkProgressValueText, ArkProgressTrack, ArkProgressRange],
  template: `
    <div arkProgressRootProvider [value]="progress">
      <span arkProgressLabel>Label</span>
      <span arkProgressValueText></span>
      <div arkProgressTrack>
        <div arkProgressRange></div>
      </div>
    </div>
  `,
  styles: [progressLinearExampleStyles],
})
export class ProgressLinearValueTextExample {
  readonly progress = useProgress({
    context: () => ({
      translations: {
        value: ({ value, max }) => {
          if (value == null) return 'Loading...'
          return `${value} of ${max} items loaded`
        },
      },
    }),
  })
}
