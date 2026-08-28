<script lang="ts">
import type { FormatTimeOptions } from '@zag-js/i18n-utils'

export interface FormatTimeProps extends FormatTimeOptions {
  /**
   * The time to format
   */
  value: string | Date
}
</script>

<script setup lang="ts">
import { formatTime } from '@zag-js/i18n-utils'
import { computed } from 'vue'
import { DEFAULT_LOCALE, useLocaleContext } from '../../providers/index.ts'

const props = defineProps<FormatTimeProps>()
const locale = useLocaleContext(DEFAULT_LOCALE)
const text = computed(() => {
  const { value, ...intlProps } = props
  return formatTime(value, locale.value.locale, intlProps)
})
</script>

<template>
  {{ text }}
</template>
