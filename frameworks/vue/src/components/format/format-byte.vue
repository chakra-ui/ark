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
import { useLocaleContext } from '../../providers'
import { LOCALE_DEFAULT } from '../../providers/locale/locale-context'

const props = defineProps<FormatByteProps>()
const ctx = useLocaleContext(LOCALE_DEFAULT)
const text = computed(() => {
  const { value, ...otherProps } = props
  return formatBytes(value, ctx.value.locale, otherProps)
})
</script>
<template>
  {{ text }}
</template>
