<script module lang="ts">
  export interface FormatNumberProps extends Intl.NumberFormatOptions {
    /**
     * The number to format
     */
    value: number
  }
</script>

<script lang="ts">
  import { formatNumber } from '@zag-js/i18n-utils'
  import { useLocaleContext } from '../../providers'

  const props: FormatNumberProps = $props()
  const locale = useLocaleContext()
  const text = $derived(() => {
    const { value, ...intlProps } = props
    return formatNumber(value, locale().locale, intlProps)
  })
</script>

{text()}
