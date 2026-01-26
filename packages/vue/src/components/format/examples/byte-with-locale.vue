<script setup lang="ts">
import { Format } from '@ark-ui/vue/format'
import { LocaleProvider } from '@ark-ui/vue/locale'
import styles from 'styles/format.module.css'

const locales = ['de-DE', 'zh-CN']
</script>

<template>
  <div :class="styles.List">
    <LocaleProvider v-for="locale in locales" :key="locale" :locale="locale">
      <div :class="styles.ListItem">
        <span :class="styles.InlineLabel">{{ locale }}:</span>
        <span :class="styles.Value">
          <Format.Byte :value="1450.45" />
        </span>
      </div>
    </LocaleProvider>
  </div>
</template>
