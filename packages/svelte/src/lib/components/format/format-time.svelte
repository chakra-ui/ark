<script module lang="ts">
  import type { FormatTimeOptions } from '@zag-js/i18n-utils'

  export interface FormatTimeProps extends FormatTimeOptions {
    /**
     * The time to format
     */
    value: string | Date
  }
</script>

<script lang="ts">
  import { formatTime } from '@zag-js/i18n-utils'
  import { useLocaleContext } from '$lib/providers/locale'

  let { value, ...props }: FormatTimeProps = $props()

  const locale = useLocaleContext()
  const text = $derived(formatTime(value, locale().locale, props))
</script>

{text}
