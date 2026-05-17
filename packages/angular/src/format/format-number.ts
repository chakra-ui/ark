import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core'
import { DEFAULT_LOCALE, injectArkLocale } from '../providers/locale/locale'

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

  private readonly providerLocale = injectArkLocale()
  protected readonly formatted = computed(() => {
    const lcl = this.locale() ?? this.providerLocale.locale ?? DEFAULT_LOCALE
    return new Intl.NumberFormat(lcl, this.options()).format(this.value())
  })
}
