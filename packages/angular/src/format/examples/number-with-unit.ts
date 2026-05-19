import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkFormatNumberComponent } from '../public-api'
import { formatExampleStyles } from '../format-example-styles'

@Component({
  selector: 'format-number-with-unit-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFormatNumberComponent],
  styles: [formatExampleStyles],
  template: `
    <span class="Value">
      <ark-format-number [value]="384.4" [style]="'unit'" unit="kilometer" />
    </span>
  `,
})
export class FormatNumberWithUnitExample {}
