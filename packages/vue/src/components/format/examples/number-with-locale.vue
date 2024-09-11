<script setup lang="ts">
import { Format } from '../..'
import { LocaleProvider } from '../../../providers'
</script>

<template>
  <LocaleProvider locale="de-DE">
    <Format.Number :value="1450.45" />
  </LocaleProvider>
</template>
