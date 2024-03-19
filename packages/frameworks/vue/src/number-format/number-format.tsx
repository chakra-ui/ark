import { formatNumber } from '@zag-js/i18n-utils'
import { computed, defineComponent } from 'vue'
import { useLocaleContext } from '../locale'
import { LOCALE_DEFAULT } from '../locale/locale-context'

const makeArr = (str: string) => str.split(',').map((s) => s.trim())

const props =
  /* @__PURE__ */
  makeArr(
    'localMatcher, style, currency, currencySign, useGrouping, minimumIntegerDigits, minimumFractionDigits, maximumFractionDigits, minimumSignificantDigits, maximumSignificantDigits, notation, compactDisplay, signDisplay, unit, unitDisplay, currencyDisplay, currencySign, value',
  ) as (keyof Intl.NumberFormatOptions)[]

export interface NumberFormatProps extends Intl.NumberFormatOptions {
  /**
   * The number to format
   */
  value: number
}

export const NumberFormat = defineComponent<NumberFormatProps>(
  (props) => {
    const ctx = useLocaleContext(LOCALE_DEFAULT)
    const text = computed(() => {
      const { value, ...intlProps } = props
      return formatNumber(value, ctx.value.locale, intlProps)
    })
    return () => text.value
  },
  {
    name: 'NumberFormat',
    props: props,
    inheritAttrs: false,
  },
)
