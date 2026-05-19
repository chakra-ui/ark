import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkFormatByteComponent } from '../public-api'
import { formatExampleStyles } from '../format-example-styles'

@Component({
  selector: 'format-byte-with-unit-system-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFormatByteComponent],
  styles: [formatExampleStyles],
  template: `
    <div class="List">
      <div class="ListItem">
        <span class="InlineLabel">Decimal (1000 bytes):</span>
        <span class="InlineValue">
          <ark-format-byte [value]="1024" unitSystem="decimal" />
        </span>
      </div>
      <div class="ListItem">
        <span class="InlineLabel">Binary (1024 bytes):</span>
        <span class="InlineValue">
          <ark-format-byte [value]="1024" unitSystem="binary" />
        </span>
      </div>
    </div>
  `,
})
export class FormatByteWithUnitSystemExample {}
