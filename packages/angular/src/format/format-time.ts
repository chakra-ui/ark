import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core'
import { DEFAULT_LOCALE, injectArkLocale } from '@ark-ui/angular/src/providers/locale'
import { type FormatTimeOptions, formatTime } from '@zag-js/i18n-utils'

export interface FormatTimeProps extends FormatTimeOptions {
  value: string | Date
  locale?: string
}

@Component({
  selector: 'ark-format-time',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    {{ formatted() }}
  `,
})
export class ArkFormatTimeComponent {
  readonly value = input.required<string | Date>()
  readonly locale = input<string | undefined>(undefined)
  readonly format = input<FormatTimeOptions['format'] | undefined>(undefined)
  readonly amLabel = input<string | undefined>(undefined)
  readonly pmLabel = input<string | undefined>(undefined)
  readonly withSeconds = input<boolean | undefined>(undefined)

  private readonly providerLocale = injectArkLocale()
  protected readonly formatted = computed(() => {
    return (
      formatTime(this.value(), this.locale() ?? this.providerLocale.locale ?? DEFAULT_LOCALE, {
        format: this.format(),
        amLabel: this.amLabel(),
        pmLabel: this.pmLabel(),
        withSeconds: this.withSeconds(),
      }) ?? ''
    )
  })
}
