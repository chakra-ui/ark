import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkFormatRelativeTimeComponent } from '../public-api'
import { formatExampleStyles } from '../format-example-styles'

@Component({
  selector: 'format-relative-time-short-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFormatRelativeTimeComponent],
  styles: [formatExampleStyles],
  template: `
    <div class="Inline">
      <span class="InlineLabel">Edited</span>
      <span class="InlineValue">
        <ark-format-relative-time [value]="value" [style]="'short'" />
      </span>
    </div>
  `,
})
export class FormatRelativeTimeShortExample {
  readonly value = new Date('2025-05-05')
}
