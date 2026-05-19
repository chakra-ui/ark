import { ChangeDetectionStrategy, Component } from '@angular/core'
import { provideArkLocale } from '../../providers/locale/locale'
import { ArkFormatTimeComponent } from '../public-api'
import { formatExampleStyles } from '../format-example-styles'

@Component({
  selector: 'format-time-with-locale-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFormatTimeComponent],
  providers: [provideArkLocale({ locale: 'ar-EG' })],
  styles: [formatExampleStyles],
  template: `
    <span class="Value">
      <ark-format-time value="13:05" format="12h" />
    </span>
  `,
})
export class FormatTimeWithLocaleExample {}
