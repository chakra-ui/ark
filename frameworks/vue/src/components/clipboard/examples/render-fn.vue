<script setup lang="ts">
import { Clipboard } from '../..'
import { CheckIcon, ClipboardCopyIcon } from './icons'
</script>

<template>
  <Clipboard.Root value="https.//ark-ui.com">
    <Clipboard.Label>Copy this link</Clipboard.Label>
    <Clipboard.Control>
      <Clipboard.Input />
      <Clipboard.Trigger>
        <Clipboard.Context v-slot="{ isCopied }">
          <CheckIcon v-if="isCopied" />
          <ClipboardCopyIcon v-else />
        </Clipboard.Context>
      </Clipboard.Trigger>
    </Clipboard.Control>
  </Clipboard.Root>
</template>
