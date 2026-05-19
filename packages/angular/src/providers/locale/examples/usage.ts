import { ChangeDetectionStrategy, Component } from '@angular/core'
import { injectArkLocale } from '../public-api'

@Component({
  selector: 'locale-usage-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p>Locale: {{ locale.locale }}</p>
    <p>Direction: {{ locale.dir }}</p>
  `,
})
export class LocaleUsageExample {
  protected readonly locale = injectArkLocale()
}
