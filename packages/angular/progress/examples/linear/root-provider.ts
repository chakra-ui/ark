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
  selector: 'progress-linear-root-provider-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkProgressRootProvider, ArkProgressLabel, ArkProgressValueText, ArkProgressTrack, ArkProgressRange],
  template: `
    <div class="stack">
      <button class="progress-button" type="button" (click)="setToMax()">Set to max</button>
      <div arkProgressRootProvider [value]="progress">
        <span arkProgressLabel>Label</span>
        <span arkProgressValueText></span>
        <div arkProgressTrack>
          <div arkProgressRange></div>
        </div>
      </div>
    </div>
  `,
  styles: [progressLinearExampleStyles],
})
export class ProgressLinearRootProviderExample {
  readonly progress = useProgress({ context: () => ({}) })

  setToMax() {
    this.progress.api().setToMax()
  }
}
