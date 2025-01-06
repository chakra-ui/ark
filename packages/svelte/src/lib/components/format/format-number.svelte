<script module lang="ts">
  export interface FormatNumberProps {
    /**
     * The byte size to format
     */
    value: number
    compactDisplay?: 'short' | 'long' | undefined
    notation?: 'standard' | 'scientific' | 'engineering' | 'compact' | undefined
    signDisplay?: 'auto' | 'never' | 'always' | 'exceptZero' | undefined
    style?: string | undefined
    unit?: string | undefined
    unitDisplay?: 'short' | 'long' | 'narrow' | undefined
    currencyDisplay?: string | undefined
    currencySign?: string | undefined
  }
</script>

<script lang="ts">
  import { formatNumber } from '@zag-js/i18n-utils'
  import { useLocaleContext } from '../../providers'

  const props: FormatNumberProps = $props()
  const locale = useLocaleContext()
  const text = $derived(() => {
    const { value, ...intlProps } = props
    // @ts-expect-error TS 5.5.2
    return formatNumber(value, locale.locale, intlProps)
  })
</script>

{text()}
