<script setup lang="ts">
import { Highlight } from '@ark-ui/vue/highlight'
import styles from 'styles/highlight.module.css'
</script>

<template>
  <p :class="styles.Text">
    <Highlight
      :class="styles.Mark"
      :query="['React', 'Vue']"
      text="Ark UI provides React, Solid, Vue, and Svelte components that are accessible and customizable."
    />
  </p>
</template>
