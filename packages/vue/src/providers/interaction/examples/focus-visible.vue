<script setup lang="ts">
import { useFocusVisible } from '@ark-ui/vue/interaction'
import { ref } from 'vue'
import styles from 'styles/interaction.module.css'

const isFocusVisible = useFocusVisible()
const focused = ref(false)
</script>

<template>
  <div :class="styles.Container">
    <p :class="styles.Status">Focus visible: {{ String(isFocusVisible) }}</p>
    <button
      type="button"
      :class="styles.Button"
      :data-focus-visible="focused && isFocusVisible ? '' : undefined"
      @focus="focused = true"
      @blur="focused = false"
    >
      Tab or click me
    </button>
  </div>
</template>
