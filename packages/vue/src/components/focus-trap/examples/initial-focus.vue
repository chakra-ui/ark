<script setup lang="ts">
import { FocusTrap } from '@ark-ui/vue/focus-trap'
import { ref } from 'vue'
import button from 'styles/button.module.css'
import field from 'styles/field.module.css'

const trapped = ref(false)
const inputRef = ref<HTMLInputElement>()
const toggle = () => {
  trapped.value = !trapped.value
}
</script>

<template>
  <div>
    <button :class="button.Root" type="button" @click="toggle">{{ trapped ? 'End Trap' : 'Start Trap' }}</button>
    <FocusTrap :disabled="!trapped" :initial-focus="() => inputRef">
      <div class="stack" style="padding-block: 1rem">
        <input :class="field.Input" type="text" placeholder="First input" />
        <input :class="field.Input" ref="inputRef" type="text" placeholder="Second input (initial focus)" />
        <textarea :class="field.Textarea" placeholder="textarea" />
        <button :class="button.Root" type="button" @click="trapped = false">End Trap</button>
      </div>
    </FocusTrap>
  </div>
</template>
