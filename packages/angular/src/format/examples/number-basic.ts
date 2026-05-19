import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkFormatNumberComponent } from '../public-api'
import { formatExampleStyles } from '../format-example-styles'

@Component({
  selector: 'format-number-basic-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFormatNumberComponent],
  styles: [formatExampleStyles],
  template: `
    <span class="Value">
      <ark-format-number [value]="1450.45" />
    </span>
  `,
})
export class FormatNumberBasicExample {}
