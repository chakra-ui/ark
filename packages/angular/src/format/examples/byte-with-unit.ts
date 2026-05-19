import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkFormatByteComponent } from '../public-api'

@Component({
  selector: 'format-byte-with-unit-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFormatByteComponent],
  template: `
    <div>
      <span>File size:</span>
      <ark-format-byte [value]="1450.45" unit="bit" />
    </div>
  `,
})
export class FormatByteWithUnitExample {}
