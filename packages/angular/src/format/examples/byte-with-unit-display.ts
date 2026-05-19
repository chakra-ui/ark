import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkFormatByteComponent } from '../public-api'
import { formatExampleStyles } from '../format-example-styles'

@Component({
  selector: 'format-byte-with-unit-display-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFormatByteComponent],
  styles: [formatExampleStyles],
  template: `
    <div class="List">
      @for (unitDisplay of unitDisplays; track unitDisplay) {
        <div class="ListItem">
          <span class="InlineLabel">{{ unitDisplay }}:</span>
          <span class="Value">
            <ark-format-byte [value]="50345.53" [unitDisplay]="unitDisplay" />
          </span>
        </div>
      }
    </div>
  `,
})
export class FormatByteWithUnitDisplayExample {
  readonly unitDisplays = ['narrow', 'short', 'long'] as const
}
