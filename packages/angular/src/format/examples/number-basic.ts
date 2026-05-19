import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkFormatNumberComponent } from '../public-api'

@Component({
  selector: 'format-number-basic-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFormatNumberComponent],
  template: `
    <ark-format-number [value]="1450.45" />
  `,
})
export class FormatNumberBasicExample {}
