import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core'
import { DEFAULT_LOCALE, injectArkLocale } from '@ark-ui/angular/src/providers/locale'
import { type FormatBytesOptions, formatBytes } from '@zag-js/i18n-utils'

export interface FormatByteProps extends FormatBytesOptions {
  value: number
  locale?: string
}

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
  readonly unit = input<FormatBytesOptions['unit']>('byte')
  readonly unitDisplay = input<FormatBytesOptions['unitDisplay']>('short')
  readonly unitSystem = input<FormatBytesOptions['unitSystem'] | undefined>(undefined)
  readonly precision = input<number | undefined>(undefined)

  private readonly providerLocale = injectArkLocale()
  protected readonly formatted = computed(() => {
    return formatBytes(this.value(), this.locale() ?? this.providerLocale.locale ?? DEFAULT_LOCALE, {
      precision: this.precision(),
      unit: this.unit(),
      unitDisplay: this.unitDisplay(),
      unitSystem: this.unitSystem(),
    })
  })
}
