<script setup lang="ts">
import { Clipboard } from '@ark-ui/vue/clipboard'
import { CheckIcon, ClipboardCopyIcon } from 'lucide-vue-next'
import { ref } from 'vue'

const url = ref('https://ark-ui.com')
const setUrl = () => {
  url.value = 'https://chakra-ui.com'
}
</script>

<template>
  <Clipboard.Root v-model="url">
    <Clipboard.Label>Copy this link</Clipboard.Label>
    <Clipboard.Control>
      <Clipboard.Input />
      <Clipboard.Trigger>
        <Clipboard.Indicator>
          <ClipboardCopyIcon />
          <template #copied>
            <CheckIcon />
          </template>
        </Clipboard.Indicator>
      </Clipboard.Trigger>
    </Clipboard.Control>

    <button @click="setUrl">Change Url</button>
  </Clipboard.Root>
</template>
