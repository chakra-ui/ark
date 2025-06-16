<script module lang="ts">
  export interface FormatRelativeTimeProps extends Intl.RelativeTimeFormatOptions {
    /**
     * The date to format
     */
    value: Date
  }
</script>

<script lang="ts">
  import { formatRelativeTime } from '@zag-js/i18n-utils'
  import { useLocaleContext } from '$lib/providers/locale'

  let { value, ...props }: FormatRelativeTimeProps = $props()

  const locale = useLocaleContext()
  const text = $derived(formatRelativeTime(value, locale().locale, props))
</script>

{text}
