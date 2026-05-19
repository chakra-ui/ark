import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkFormatTimeComponent } from '../public-api'
import { formatExampleStyles } from '../format-example-styles'

@Component({
  selector: 'format-time-with-seconds-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFormatTimeComponent],
  styles: [formatExampleStyles],
  template: `
    <div class="Inline">
      <span class="InlineLabel">Last sync</span>
      <span class="InlineValue">
        <ark-format-time value="03:07:19" format="12h" [withSeconds]="true" />
      </span>
    </div>
  `,
})
export class FormatTimeWithSecondsExample {}
