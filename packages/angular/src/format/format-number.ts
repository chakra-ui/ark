import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core'
import { DEFAULT_LOCALE, injectArkLocale } from '@ark-ui/angular/src/providers/locale'
import { formatNumber } from '@zag-js/i18n-utils'

export interface FormatNumberProps extends Intl.NumberFormatOptions {
  value: number
  locale?: string
}

@Component({
  selector: 'ark-format-number',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    {{ formatted() }}
  `,
})
export class ArkFormatNumberComponent {
  readonly value = input.required<number>()
  readonly locale = input<string | undefined>(undefined)
  readonly options = input<Intl.NumberFormatOptions | undefined>(undefined)
  readonly style = input<Intl.NumberFormatOptions['style'] | undefined>(undefined)
  readonly currency = input<string | undefined>(undefined)
  readonly currencyDisplay = input<Intl.NumberFormatOptions['currencyDisplay'] | undefined>(undefined)
  readonly currencySign = input<Intl.NumberFormatOptions['currencySign'] | undefined>(undefined)
  readonly unit = input<string | undefined>(undefined)
  readonly unitDisplay = input<Intl.NumberFormatOptions['unitDisplay'] | undefined>(undefined)
  readonly notation = input<Intl.NumberFormatOptions['notation'] | undefined>(undefined)
  readonly compactDisplay = input<Intl.NumberFormatOptions['compactDisplay'] | undefined>(undefined)
  readonly useGrouping = input<Intl.NumberFormatOptions['useGrouping'] | undefined>(undefined)
  readonly minimumIntegerDigits = input<number | undefined>(undefined)
  readonly minimumFractionDigits = input<number | undefined>(undefined)
  readonly maximumFractionDigits = input<number | undefined>(undefined)
  readonly minimumSignificantDigits = input<number | undefined>(undefined)
  readonly maximumSignificantDigits = input<number | undefined>(undefined)
  readonly signDisplay = input<Intl.NumberFormatOptions['signDisplay'] | undefined>(undefined)

  private readonly providerLocale = injectArkLocale()
  protected readonly formatted = computed(() => {
    return formatNumber(this.value(), this.locale() ?? this.providerLocale.locale ?? DEFAULT_LOCALE, this.intlOptions())
  })

  private intlOptions(): Intl.NumberFormatOptions {
    return compactOptions({
      ...this.options(),
      ...compactOptions({
        style: this.style(),
        currency: this.currency(),
        currencyDisplay: this.currencyDisplay(),
        currencySign: this.currencySign(),
        unit: this.unit(),
        unitDisplay: this.unitDisplay(),
        notation: this.notation(),
        compactDisplay: this.compactDisplay(),
        useGrouping: this.useGrouping(),
        minimumIntegerDigits: this.minimumIntegerDigits(),
        minimumFractionDigits: this.minimumFractionDigits(),
        maximumFractionDigits: this.maximumFractionDigits(),
        minimumSignificantDigits: this.minimumSignificantDigits(),
        maximumSignificantDigits: this.maximumSignificantDigits(),
        signDisplay: this.signDisplay(),
      }),
    })
  }
}

function compactOptions<T extends Record<string, unknown>>(options: T): T {
  return Object.fromEntries(Object.entries(options).filter(([, value]) => value !== undefined)) as T
}
