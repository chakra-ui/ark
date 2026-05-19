import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkFormatByteComponent } from '../public-api'
import { formatExampleStyles } from '../format-example-styles'

@Component({
  selector: 'format-byte-basic-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFormatByteComponent],
  styles: [formatExampleStyles],
  template: `
    <div class="Root">
      <span class="Label">File size</span>
      <span class="Value">
        <ark-format-byte [value]="120000" />
      </span>
    </div>
  `,
})
export class FormatByteBasicExample {}
