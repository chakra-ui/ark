import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkFormatNumberComponent } from '../public-api'
import { formatExampleStyles } from '../format-example-styles'

@Component({
  selector: 'format-number-with-compact-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFormatNumberComponent],
  styles: [formatExampleStyles],
  template: `
    <div class="Root">
      <span class="ValueLarge">
        <ark-format-number [value]="1500000" notation="compact" compactDisplay="short" />
      </span>
      <span class="Label">downloads per month</span>
    </div>
  `,
})
export class FormatNumberWithCompactExample {}
