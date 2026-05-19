import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkFormatNumberComponent } from '../public-api'

@Component({
  selector: 'format-number-with-unit-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFormatNumberComponent],
  template: `
    <ark-format-number [value]="384.4" [style]="'unit'" unit="kilometer" />
  `,
})
export class FormatNumberWithUnitExample {}
