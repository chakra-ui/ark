<script setup lang="ts">
import { FocusTrap } from '@ark-ui/vue/focus-trap'
import { ref } from 'vue'
import button from 'styles/button.module.css'
import field from 'styles/field.module.css'

const trapped = ref(false)
const buttonRef = ref<HTMLButtonElement>()
</script>

<template>
  <div>
    <button :class="button.Root" type="button" ref="buttonRef" @click="trapped = !trapped">
      {{ trapped ? 'End Trap' : 'Start Trap' }}
    </button>
    <FocusTrap v-if="trapped" :disabled="!trapped" :set-return-focus="buttonRef">
      <div class="stack" style="padding-block: 1rem">
        <input :class="field.Input" type="text" placeholder="Regular input" />
        <input :class="field.Input" type="text" placeholder="Autofocused input" autofocus />
        <button :class="button.Root" type="button" @click="trapped = false">End Trap</button>
      </div>
    </FocusTrap>
  </div>
</template>
