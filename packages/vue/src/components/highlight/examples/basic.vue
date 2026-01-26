<script setup lang="ts">
import { Highlight } from '@ark-ui/vue/highlight'
import styles from 'styles/highlight.module.css'
</script>

<template>
  <p :class="styles.Text">
    <Highlight
      :class="styles.Mark"
      query="component"
      text="Ark UI is a headless component library for building accessible web applications."
    />
  </p>
</template>
