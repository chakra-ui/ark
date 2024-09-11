<script setup lang="ts">
import { Format } from '../..'
import { LocaleProvider } from '../../../providers'

const locales = ['de-DE', 'zh-CN']
const value = 1450.45
</script>

<template>
  <div>
    <LocaleProvider v-for="locale in locales" :key="locale" :locale="locale">
      <Format.Byte :value="value" />
    </LocaleProvider>
  </div>
</template>
