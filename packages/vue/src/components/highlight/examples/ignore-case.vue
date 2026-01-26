<script setup lang="ts">
import { Highlight } from '@ark-ui/vue/highlight'
import styles from 'styles/highlight.module.css'
</script>

<template>
  <p :class="styles.Text">
    <Highlight
      :class="styles.Mark"
      text="TypeScript provides static type checking. Using typescript helps catch errors early in development."
      query="typescript"
      ignore-case
    />
  </p>
</template>
