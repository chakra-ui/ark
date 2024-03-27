import { formatBytes } from '@zag-js/i18n-utils'
import { computed, defineComponent } from 'vue'
import { useLocaleContext } from '../locale'
import { LOCALE_DEFAULT } from '../locale/locale-context'

export interface FormatByteProps {
  /**
   * The unit granularity to display
   */
  unit?: 'bit' | 'byte'
  /**
   * The unit display
   */
  unitDisplay?: 'long' | 'short' | 'narrow'
  /**
   * The byte size to format
   */
  value: number
}

export const FormatByte = defineComponent<FormatByteProps>(
  (props) => {
    const ctx = useLocaleContext(LOCALE_DEFAULT)
    const text = computed(() => {
      const { value, ...intlProps } = props
      return formatBytes(value, ctx.value.locale, intlProps)
    })
    return () => text.value
  },
  {
    name: 'FormatByte',
    props: ['unit', 'unitDisplay', 'value'],
  },
)
