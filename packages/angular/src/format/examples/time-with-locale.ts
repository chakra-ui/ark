import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkFormatTimeComponent } from '../public-api'

@Component({
  selector: 'format-time-with-locale-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFormatTimeComponent],
  template: `
    <ark-format-time value="13:05" format="12h" locale="ar-EG" />
  `,
})
export class FormatTimeWithLocaleExample {}
