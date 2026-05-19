import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkFormatNumberComponent } from '../public-api'

@Component({
  selector: 'format-number-with-compact-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFormatNumberComponent],
  template: `
    <div>
      <strong>
        <ark-format-number [value]="1500000" notation="compact" compactDisplay="short" />
      </strong>
      <span>downloads per month</span>
    </div>
  `,
})
export class FormatNumberWithCompactExample {}
