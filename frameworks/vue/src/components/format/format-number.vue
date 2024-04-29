<script lang="ts">
export interface FormatNumberProps {
  /**
   * The byte size to format
   */
  value: number
  compactDisplay?: 'short' | 'long' | undefined
  notation?: 'standard' | 'scientific' | 'engineering' | 'compact' | undefined
  signDisplay?: 'auto' | 'never' | 'always' | 'exceptZero' | undefined
  unit?: string | undefined
  unitDisplay?: 'short' | 'long' | 'narrow' | undefined
  currencyDisplay?: string | undefined
  currencySign?: string | undefined
}
</script>

<script setup lang="ts">
import { formatNumber } from '@zag-js/i18n-utils'
import { computed } from 'vue'
import { DEFAULT_LOCALE, useLocaleContext } from '../../providers'

const props = defineProps<FormatNumberProps>()
const locale = useLocaleContext(DEFAULT_LOCALE)
const text = computed(() => {
  const { value, ...intlProps } = props
  return formatNumber(value, locale.value.locale, intlProps)
})
</script>

<template>
  {{ text }}
</template>
