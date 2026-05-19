import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkFormatByteComponent } from '../public-api'
import { formatExampleStyles } from '../format-example-styles'

@Component({
  selector: 'format-byte-with-unit-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFormatByteComponent],
  styles: [formatExampleStyles],
  template: `
    <div class="Inline">
      <span class="InlineLabel">File size:</span>
      <span class="InlineValue">
        <ark-format-byte [value]="1450.45" unit="bit" />
      </span>
    </div>
  `,
})
export class FormatByteWithUnitExample {}
