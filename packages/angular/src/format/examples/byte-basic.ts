import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkFormatByteComponent } from '../public-api'

@Component({
  selector: 'format-byte-basic-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFormatByteComponent],
  template: `
    <div>
      <span>File size</span>
      <strong>
        <ark-format-byte [value]="120000" />
      </strong>
    </div>
  `,
})
export class FormatByteBasicExample {}
