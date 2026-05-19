import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkFormatNumberComponent } from '../public-api'

@Component({
  selector: 'format-number-with-percentage-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFormatNumberComponent],
  template: `
    <ark-format-number [value]="0.145" [style]="'percent'" [maximumFractionDigits]="2" [minimumFractionDigits]="2" />
  `,
})
export class FormatNumberWithPercentageExample {}
