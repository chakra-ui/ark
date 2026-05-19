import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkFormatByteComponent } from '../public-api'

@Component({
  selector: 'format-byte-sizes-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFormatByteComponent],
  template: `
    <div>
      @for (size of byteSizes; track size) {
        <div>
          <ark-format-byte [value]="size" />
        </div>
      }
    </div>
  `,
})
export class FormatByteSizesExample {
  readonly byteSizes = [50, 5000, 5000000, 5000000000]
}
