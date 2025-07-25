<script setup lang="ts">
import { Clipboard } from '@ark-ui/vue/clipboard'
import { CheckIcon, ClipboardCopyIcon } from 'lucide-vue-next'
</script>

<template>
  <Clipboard.Root default-value="https://ark-ui.com">
    <Clipboard.ValueText />
    <Clipboard.Trigger>
      <Clipboard.Indicator>
        <ClipboardCopyIcon />
        <template #copied>
          <CheckIcon />
        </template>
      </Clipboard.Indicator>
      Copy
    </Clipboard.Trigger>
  </Clipboard.Root>
</template>
