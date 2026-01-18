<script setup lang="ts">
import { Highlight } from '@ark-ui/vue/highlight'
import styles from 'styles/highlight.module.css'
</script>

<template>
  <div :class="styles.Root">
    <div :class="styles.Section">
      <span :class="styles.Label">Partial Match</span>
      <p :class="styles.Text">
        <Highlight
          :class="styles.Mark"
          query="box"
          text="The checkbox component renders a box element. Use combobox for autocomplete."
          match-all
        />
      </p>
    </div>
    <div :class="styles.Section">
      <span :class="styles.Label">Exact Match</span>
      <p :class="styles.Text">
        <Highlight
          :class="styles.Mark"
          query="box"
          text="The checkbox component renders a box element. Use combobox for autocomplete."
          exact-match
          match-all
        />
      </p>
    </div>
  </div>
</template>
