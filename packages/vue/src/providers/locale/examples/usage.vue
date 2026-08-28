<script setup lang="ts">
import { DEFAULT_LOCALE, useLocaleContext } from '@ark-ui/vue/locale'

const locale = useLocaleContext(DEFAULT_LOCALE)
</script>

<template>
  <pre>{{ JSON.stringify(locale, null, 2) }}</pre>
</template>
