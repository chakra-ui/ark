import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkFormatTimeComponent } from '../public-api'

@Component({
  selector: 'format-time-with-date-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFormatTimeComponent],
  template: `
    <div>
      <span>Boarding</span>
      <ark-format-time [value]="value" />
    </div>
  `,
})
export class FormatTimeWithDateExample {
  readonly value = new Date(2026, 1, 27, 18, 45, 34)
}
