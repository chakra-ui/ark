import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkFormatTimeComponent } from '../public-api'
import { formatExampleStyles } from '../format-example-styles'

@Component({
  selector: 'format-time-with-am-pm-labels-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFormatTimeComponent],
  styles: [formatExampleStyles],
  template: `
    <div class="Inline">
      <span class="InlineLabel">Support window</span>
      <span class="InlineValue">
        <ark-format-time value="17:15:00" format="12h" amLabel="morning" pmLabel="evening" />
      </span>
    </div>
  `,
})
export class FormatTimeWithAmPmLabelsExample {}
