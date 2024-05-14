<script lang="ts">
export interface LocaleProviderProps {
  /**
   * The locale to use. For example, 'en-US'.
   */
  locale: string
}
</script>

<script setup lang="ts">
import { isRTL, type Locale } from '@zag-js/i18n-utils'
import { computed } from 'vue'
import { LocaleContextProvider } from './use-locale-context'

const props = defineProps<LocaleProviderProps>()
const context = computed<Locale>(() => ({
  locale: props.locale,
  dir: isRTL(props.locale) ? 'rtl' : 'ltr',
}))

LocaleContextProvider(context)
</script>

<template>
  <slot />
</template>
