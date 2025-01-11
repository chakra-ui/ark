<script setup lang="ts">
import { FocusTrap } from '@ark-ui/vue/focus-trap'
import { ref } from 'vue'

const trapped = ref(false)
</script>

<template>
  <button @click="trapped = true">Start Trap</button>
  <FocusTrap :return-focus-on-deactivate="false" :disabled="!trapped">
    <div style="display: flex; flex-direction: column; gap: 1rem; padding-block: 1rem">
      <input type="text" placeholder="input" />
      <textarea placeholder="textarea" />
      <button @click="trapped = false">End Trap</button>
    </div>
  </FocusTrap>
</template>
