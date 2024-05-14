<script lang="ts">
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

<script setup lang="ts">
import { formatBytes } from '@zag-js/i18n-utils'
import { computed } from 'vue'
import { DEFAULT_LOCALE, useLocaleContext } from '../../providers'

const props = defineProps<FormatByteProps>()
const locale = useLocaleContext(DEFAULT_LOCALE)
const text = computed(() => {
  const { value, ...otherProps } = props
  return formatBytes(value, locale.value.locale, otherProps)
})
</script>
<template>
  {{ text }}
</template>
