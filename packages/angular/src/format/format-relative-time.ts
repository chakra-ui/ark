import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core'
import { DEFAULT_LOCALE, injectArkLocale } from '@ark-ui/angular/src/providers/locale'
import { formatRelativeTime } from '@zag-js/i18n-utils'

export interface FormatRelativeTimeProps extends Intl.RelativeTimeFormatOptions {
  value: Date
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
  readonly value = input.required<Date>()
  readonly locale = input<string | undefined>(undefined)
  readonly options = input<Intl.RelativeTimeFormatOptions | undefined>(undefined)
  readonly localeMatcher = input<Intl.RelativeTimeFormatOptions['localeMatcher'] | undefined>(undefined)
  readonly numeric = input<Intl.RelativeTimeFormatOptions['numeric'] | undefined>(undefined)
  readonly style = input<Intl.RelativeTimeFormatOptions['style'] | undefined>(undefined)

  private readonly providerLocale = injectArkLocale()
  protected readonly formatted = computed(() => {
    return formatRelativeTime(this.value(), this.locale() ?? this.providerLocale.locale ?? DEFAULT_LOCALE, {
      ...this.options(),
      localeMatcher: this.localeMatcher(),
      numeric: this.numeric(),
      style: this.style(),
    })
  })
}
