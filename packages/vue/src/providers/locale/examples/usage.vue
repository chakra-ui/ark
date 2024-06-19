<script setup lang="ts">
import { useLocaleContext } from '../'

const locale = useLocaleContext()
</script>

<template>
  <pre>{{ JSON.stringify(locale, null, 2) }}</pre>
</template>
