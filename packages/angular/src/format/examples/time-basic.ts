import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkFormatTimeComponent } from '../public-api'

@Component({
  selector: 'format-time-basic-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFormatTimeComponent],
  template: `
    <ark-format-time value="18:47:12" format="12h" />
  `,
})
export class FormatTimeBasicExample {}
