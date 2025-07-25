<script setup lang="ts">
import { Clipboard } from '@ark-ui/vue/clipboard'
import { CheckIcon, ClipboardCopyIcon } from 'lucide-vue-next'
</script>

<template>
  <Clipboard.Root default-value="https://ark-ui.com">
    <Clipboard.Label>Copy this link</Clipboard.Label>
    <Clipboard.Control>
      <Clipboard.Trigger>
        <Clipboard.Context v-slot="clipboard">
          <div>
            <CheckIcon v-if="clipboard.copied" />
            <ClipboardCopyIcon v-else />
            <span>
              {{ clipboard.copied ? 'Copied!' : 'Copy' }}
            </span>
            <small>Value: {{ clipboard.value }}</small>
          </div>
        </Clipboard.Context>
      </Clipboard.Trigger>
    </Clipboard.Control>
  </Clipboard.Root>
</template>
