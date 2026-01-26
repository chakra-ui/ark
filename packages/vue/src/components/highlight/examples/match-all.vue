<script setup lang="ts">
import { Highlight } from '@ark-ui/vue/highlight'
import styles from 'styles/highlight.module.css'
</script>

<template>
  <div :class="styles.Root">
    <div :class="styles.Section">
      <span :class="styles.Label">Match All</span>
      <p :class="styles.Text">
        <Highlight
          :class="styles.Mark"
          text="Each component follows WAI-ARIA guidelines. Every component is rigorously tested to ensure accessibility."
          query="component"
          match-all
        />
      </p>
    </div>
    <div :class="styles.Section">
      <span :class="styles.Label">Match First Only</span>
      <p :class="styles.Text">
        <Highlight
          :class="styles.Mark"
          text="Each component follows WAI-ARIA guidelines. Every component is rigorously tested to ensure accessibility."
          query="component"
          :match-all="false"
        />
      </p>
    </div>
  </div>
</template>
