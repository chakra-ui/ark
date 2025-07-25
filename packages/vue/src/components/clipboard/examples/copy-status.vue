<script setup lang="ts">
import { Clipboard } from '@ark-ui/vue/clipboard'
import { CheckIcon, ClipboardCopyIcon } from 'lucide-vue-next'
import { ref } from 'vue'

const copyCount = ref(0)
</script>

<template>
  <Clipboard.Root
    default-value="https://ark-ui.com"
    @status-change="
      (details) => {
        if (details.copied) {
          copyCount += 1
        }
      }
    "
  >
    <Clipboard.Trigger>
      <Clipboard.Indicator>
        <ClipboardCopyIcon />
        <template #copied>
          <CheckIcon />
        </template>
      </Clipboard.Indicator>
      Copy
    </Clipboard.Trigger>
    <p>Copied {{ copyCount }} times</p>
  </Clipboard.Root>
</template>
