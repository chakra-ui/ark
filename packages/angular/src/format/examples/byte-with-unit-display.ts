import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkFormatByteComponent } from '../public-api'

@Component({
  selector: 'format-byte-with-unit-display-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFormatByteComponent],
  template: `
    <div>
      @for (unitDisplay of unitDisplays; track unitDisplay) {
        <div>
          <span>{{ unitDisplay }}:</span>
          <ark-format-byte [value]="50345.53" [unitDisplay]="unitDisplay" />
        </div>
      }
    </div>
  `,
})
export class FormatByteWithUnitDisplayExample {
  readonly unitDisplays = ['narrow', 'short', 'long'] as const
}
