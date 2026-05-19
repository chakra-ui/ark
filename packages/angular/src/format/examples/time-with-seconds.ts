import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkFormatTimeComponent } from '../public-api'

@Component({
  selector: 'format-time-with-seconds-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFormatTimeComponent],
  template: `
    <div>
      <span>Last sync</span>
      <ark-format-time value="03:07:19" format="12h" [withSeconds]="true" />
    </div>
  `,
})
export class FormatTimeWithSecondsExample {}
