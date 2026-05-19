import { ChangeDetectionStrategy, Component } from '@angular/core'
import { provideArkLocale } from '../../providers/locale/locale'
import { ArkFormatNumberComponent } from '../public-api'
import { formatExampleStyles } from '../format-example-styles'

@Component({
  selector: 'format-number-with-locale-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFormatNumberComponent],
  providers: [provideArkLocale({ locale: 'de-DE' })],
  styles: [formatExampleStyles],
  template: `
    <span class="Value">
      <ark-format-number [value]="1450.45" />
    </span>
  `,
})
export class FormatNumberWithLocaleExample {}
