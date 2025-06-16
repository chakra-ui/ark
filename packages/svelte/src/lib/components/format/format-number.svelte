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
  import { useLocaleContext } from '$lib/providers/locale'

  const { value, ...props }: FormatNumberProps = $props()
  const locale = useLocaleContext()
  const text = $derived(formatNumber(value, locale().locale, props))
</script>

{text}
