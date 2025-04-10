<script module lang="ts">
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
</script>

<script lang="ts">
  import { formatBytes } from '@zag-js/i18n-utils'
  import { useLocaleContext } from '../../providers'

  const props: FormatByteProps = $props()
  const locale = useLocaleContext()
  const text = $derived(() => {
    const { value, ...intlProps } = props
    return formatBytes(value, locale.locale, intlProps)
  })
</script>

{text()}
