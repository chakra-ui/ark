<script setup lang="ts">
import { FocusTrap } from '@ark-ui/vue/focus-trap'
import { ref } from 'vue'
import button from 'styles/button.module.css'
import field from 'styles/field.module.css'

const trapped = ref(false)
</script>

<template>
  <button :class="button.Root" type="button" @click="trapped = true">Start Trap</button>
  <FocusTrap :return-focus-on-deactivate="false" :disabled="!trapped">
    <div class="stack" style="padding-block: 1rem">
      <input :class="field.Input" type="text" placeholder="input" />
      <textarea :class="field.Textarea" placeholder="textarea" />
      <button :class="button.Root" type="button" @click="trapped = false">End Trap</button>
    </div>
  </FocusTrap>
</template>
