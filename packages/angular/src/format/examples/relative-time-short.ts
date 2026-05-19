import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkFormatRelativeTimeComponent } from '../public-api'

@Component({
  selector: 'format-relative-time-short-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFormatRelativeTimeComponent],
  template: `
    <div>
      <span>Edited</span>
      <ark-format-relative-time [value]="value" [style]="'short'" />
    </div>
  `,
})
export class FormatRelativeTimeShortExample {
  readonly value = new Date('2025-05-05')
}
