import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core'
import { DEFAULT_LOCALE, injectArkLocale } from '@ark-ui/angular/src/providers/locale'
import { formatRelativeTime } from '@zag-js/i18n-utils'

export interface FormatRelativeTimeProps extends Intl.RelativeTimeFormatOptions {
  value: Date | number
  unit?: Intl.RelativeTimeFormatUnit
  locale?: string
}

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
  readonly value = input.required<Date | number>()
  readonly unit = input<Intl.RelativeTimeFormatUnit>('day')
  readonly locale = input<string | undefined>(undefined)
  readonly options = input<Intl.RelativeTimeFormatOptions | undefined>(undefined)
  readonly localeMatcher = input<Intl.RelativeTimeFormatOptions['localeMatcher'] | undefined>(undefined)
  readonly numeric = input<Intl.RelativeTimeFormatOptions['numeric'] | undefined>(undefined)
  readonly style = input<Intl.RelativeTimeFormatOptions['style'] | undefined>(undefined)

  private readonly providerLocale = injectArkLocale()
  protected readonly formatted = computed(() => {
    const locale = this.locale() ?? this.providerLocale.locale ?? DEFAULT_LOCALE
    const options = compactOptions({
      ...this.options(),
      ...compactOptions({
        localeMatcher: this.localeMatcher(),
        numeric: this.numeric(),
        style: this.style(),
      }),
    })
    const value = this.value()
    if (value instanceof Date) {
      return formatRelativeTime(value, locale, options)
    }
    return new Intl.RelativeTimeFormat(locale, options).format(value, this.unit())
  })
}

function compactOptions<T extends Record<string, unknown>>(options: T): T {
  return Object.fromEntries(Object.entries(options).filter(([, value]) => value !== undefined)) as T
}
