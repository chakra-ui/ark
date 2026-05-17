import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core'
import { DEFAULT_LOCALE, injectArkLocale } from '../providers/locale/locale'

type RelativeUnit = 'year' | 'quarter' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second'

@Component({
  selector: 'ark-format-relative-time',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    {{ formatted() }}
  `,
})
export class ArkFormatRelativeTimeComponent {
  readonly value = input.required<number>()
  readonly unit = input<RelativeUnit>('second')
  readonly locale = input<string | undefined>(undefined)
  readonly options = input<Intl.RelativeTimeFormatOptions | undefined>(undefined)

  private readonly providerLocale = injectArkLocale()
  protected readonly formatted = computed(() => {
    const lcl = this.locale() ?? this.providerLocale.locale ?? DEFAULT_LOCALE
    return new Intl.RelativeTimeFormat(lcl, this.options()).format(this.value(), this.unit())
  })
}
