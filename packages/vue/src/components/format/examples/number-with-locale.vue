<script setup lang="ts">
import { Format } from '@ark-ui/vue/format'
import { LocaleProvider } from '@ark-ui/vue/locale'
</script>

<template>
  <LocaleProvider locale="de-DE">
    <Format.Number :value="1450.45" />
  </LocaleProvider>
</template>
