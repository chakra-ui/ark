import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkFormatByteComponent } from '../public-api'

@Component({
  selector: 'format-byte-with-unit-system-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFormatByteComponent],
  template: `
    <div>
      <div>
        <span>Decimal (1000 bytes):</span>
        <ark-format-byte [value]="1024" unitSystem="decimal" />
      </div>
      <div>
        <span>Binary (1024 bytes):</span>
        <ark-format-byte [value]="1024" unitSystem="binary" />
      </div>
    </div>
  `,
})
export class FormatByteWithUnitSystemExample {}
