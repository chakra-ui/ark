import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkFormatNumberComponent } from '../public-api'

@Component({
  selector: 'format-number-with-currency-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFormatNumberComponent],
  template: `
    <ark-format-number [value]="1234.45" [style]="'currency'" currency="USD" />
  `,
})
export class FormatNumberWithCurrencyExample {}
