import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkFormatTimeComponent } from '../public-api'
import { formatExampleStyles } from '../format-example-styles'

@Component({
  selector: 'format-time-with-date-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFormatTimeComponent],
  styles: [formatExampleStyles],
  template: `
    <div class="Inline">
      <span class="InlineLabel">Boarding</span>
      <span class="InlineValue">
        <ark-format-time [value]="value" />
      </span>
    </div>
  `,
})
export class FormatTimeWithDateExample {
  readonly value = new Date(2026, 1, 27, 18, 45, 34)
}
