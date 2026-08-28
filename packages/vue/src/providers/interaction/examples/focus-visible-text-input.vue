<script setup lang="ts">
import { useFocusVisible } from '@ark-ui/vue/interaction'
import { ref } from 'vue'
import styles from 'styles/interaction.module.css'

const isFocusVisible = useFocusVisible({ isTextInput: true })
const focusedField = ref<string | null>(null)
</script>

<template>
  <div :class="styles.Container">
    <p :class="styles.Status">Focus visible: {{ String(isFocusVisible) }}</p>
    <div :class="styles.Field">
      <label :class="styles.Label" for="first-name">First Name</label>
      <input
        id="first-name"
        type="text"
        :class="styles.Input"
        :data-focus-visible="focusedField === 'first' && isFocusVisible ? '' : undefined"
        @focus="focusedField = 'first'"
        @blur="focusedField = null"
      />
    </div>
    <div :class="styles.Field">
      <label :class="styles.Label" for="last-name">Last Name</label>
      <input
        id="last-name"
        type="text"
        :class="styles.Input"
        :data-focus-visible="focusedField === 'last' && isFocusVisible ? '' : undefined"
        @focus="focusedField = 'last'"
        @blur="focusedField = null"
      />
    </div>
  </div>
</template>
