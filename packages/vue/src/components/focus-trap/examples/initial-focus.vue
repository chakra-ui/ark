<script setup lang="ts">
import { FocusTrap } from '@ark-ui/vue/focus-trap'
import { ref } from 'vue'

const trapped = ref(false)
const inputRef = ref<HTMLInputElement>()
const toggle = () => {
  trapped.value = !trapped.value
}
</script>

<template>
  <div>
    <button @click="toggle">{{ trapped ? 'End Trap' : 'Start Trap' }}</button>
    <FocusTrap :disabled="!trapped" :initial-focus="() => inputRef">
      <div style="display: flex; flex-direction: column; gap: 1rem; padding-block: 1rem">
        <input type="text" placeholder="First input" />
        <input ref="inputRef" type="text" placeholder="Second input (initial focus)" />
        <textarea placeholder="textarea" />
        <button @click="trapped = false">End Trap</button>
      </div>
    </FocusTrap>
  </div>
</template>
