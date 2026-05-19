import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkFormatRelativeTimeComponent } from '../public-api'
import { formatExampleStyles } from '../format-example-styles'

@Component({
  selector: 'format-relative-time-basic-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFormatRelativeTimeComponent],
  styles: [formatExampleStyles],
  template: `
    <div class="Inline">
      <span class="InlineLabel">Last updated</span>
      <span class="InlineValue">
        <ark-format-relative-time [value]="value" />
      </span>
    </div>
  `,
})
export class FormatRelativeTimeBasicExample {
  readonly value = new Date('2025-05-05')
}
