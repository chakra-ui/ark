<script setup lang="ts">
import { FocusTrap } from '@ark-ui/vue/focus-trap'
import { ref } from 'vue'

const trapped = ref(false)
const buttonRef = ref<HTMLButtonElement>()
</script>

<template>
  <div>
    <button ref="buttonRef" @click="trapped = !trapped">
      {{ trapped ? 'End Trap' : 'Start Trap' }}
    </button>
    <FocusTrap v-if="trapped" :disabled="!trapped" :set-return-focus="buttonRef">
      <div style="display: flex; flex-direction: column; gap: 1rem; padding-block: 1rem">
        <input type="text" placeholder="Regular input" />
        <input type="text" placeholder="Autofocused input" autofocus />
        <button @click="trapped = false">End Trap</button>
      </div>
    </FocusTrap>
  </div>
</template>
