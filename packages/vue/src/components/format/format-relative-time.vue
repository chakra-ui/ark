<script lang="ts">
export interface FormatRelativeTimeProps {
  /**
   * The date to format
   */
  value: Date
  /**
   * The locale matching algorithm to use. For information about this option, see [Intl page](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_negotiation).
   */
  localeMatcher?: Intl.RelativeTimeFormatLocaleMatcher
  /**
   * The format of output message.
   */
  numeric?: Intl.RelativeTimeFormatNumeric
  /**
   * The length of the internationalized message.
   */
  style?: Intl.RelativeTimeFormatStyle
}
</script>

<script setup lang="ts">
import { formatRelativeTime } from '@zag-js/i18n-utils'
import { computed } from 'vue'
import { DEFAULT_LOCALE, useLocaleContext } from '../../providers'

const props = defineProps<FormatRelativeTimeProps>()
const locale = useLocaleContext(DEFAULT_LOCALE)
const text = computed(() => {
  const { value, ...intlProps } = props
  return formatRelativeTime(value, locale.value.locale, intlProps)
})
</script>

<template>
  {{ text }}
</template>
