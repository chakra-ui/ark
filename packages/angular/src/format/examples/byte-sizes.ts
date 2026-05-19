import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkFormatByteComponent } from '../public-api'
import { formatExampleStyles } from '../format-example-styles'

@Component({
  selector: 'format-byte-sizes-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFormatByteComponent],
  styles: [formatExampleStyles],
  template: `
    <div class="List">
      @for (size of byteSizes; track size) {
        <div class="ListItem">
          <span class="Value">
            <ark-format-byte [value]="size" />
          </span>
        </div>
      }
    </div>
  `,
})
export class FormatByteSizesExample {
  readonly byteSizes = [50, 5000, 5000000, 5000000000]
}
