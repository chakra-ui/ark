import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkFormatRelativeTimeComponent } from '../public-api'

@Component({
  selector: 'format-relative-time-basic-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFormatRelativeTimeComponent],
  template: `
    <div>
      <span>Last updated</span>
      <ark-format-relative-time [value]="value" />
    </div>
  `,
})
export class FormatRelativeTimeBasicExample {
  readonly value = new Date('2025-05-05')
}
