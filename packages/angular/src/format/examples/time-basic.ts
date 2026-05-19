import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkFormatTimeComponent } from '../public-api'
import { formatExampleStyles } from '../format-example-styles'

@Component({
  selector: 'format-time-basic-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFormatTimeComponent],
  styles: [formatExampleStyles],
  template: `
    <span class="Value">
      <ark-format-time value="18:47:12" format="12h" />
    </span>
  `,
})
export class FormatTimeBasicExample {}
