import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkFormatNumberComponent } from '../public-api'
import { formatExampleStyles } from '../format-example-styles'

@Component({
  selector: 'format-number-with-percentage-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFormatNumberComponent],
  styles: [formatExampleStyles],
  template: `
    <span class="Value">
      <ark-format-number [value]="0.145" [style]="'percent'" [maximumFractionDigits]="2" [minimumFractionDigits]="2" />
    </span>
  `,
})
export class FormatNumberWithPercentageExample {}
