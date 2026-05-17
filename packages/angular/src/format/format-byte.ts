import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core'
import { DEFAULT_LOCALE, injectArkLocale } from '../providers/locale/locale'

@Component({
  selector: 'ark-format-byte',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    {{ formatted() }}
  `,
})
export class ArkFormatByteComponent {
  readonly value = input.required<number>()
  readonly locale = input<string | undefined>(undefined)
  readonly unit = input<'bit' | 'byte'>('byte')
  readonly unitDisplay = input<'short' | 'long' | 'narrow'>('short')

  private readonly providerLocale = injectArkLocale()
  protected readonly formatted = computed(() => {
    const lcl = this.locale() ?? this.providerLocale.locale ?? DEFAULT_LOCALE
    return new Intl.NumberFormat(lcl, {
      style: 'unit',
      unit: this.unit(),
      unitDisplay: this.unitDisplay(),
    }).format(this.value())
  })
}
