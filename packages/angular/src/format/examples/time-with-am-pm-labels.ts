import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkFormatTimeComponent } from '../public-api'

@Component({
  selector: 'format-time-with-am-pm-labels-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFormatTimeComponent],
  template: `
    <div>
      <span>Support window</span>
      <ark-format-time value="17:15:00" format="12h" amLabel="morning" pmLabel="evening" />
    </div>
  `,
})
export class FormatTimeWithAmPmLabelsExample {}
