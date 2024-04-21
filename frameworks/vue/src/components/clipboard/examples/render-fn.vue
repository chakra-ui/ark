<script setup lang="ts">
import { Clipboard } from '../..'
import { CheckIcon, ClipboardCopyIcon } from './icons'
</script>

<template>
  <Clipboard.Root v-slot="api" value="https.//ark-ui.com">
    <Clipboard.Label>Copy this link</Clipboard.Label>
    <Clipboard.Control>
      <Clipboard.Input />
      <Clipboard.Trigger>
        <CheckIcon v-if="api.isCopied" />
        <ClipboardCopyIcon v-else />
      </Clipboard.Trigger>
    </Clipboard.Control>
  </Clipboard.Root>
</template>
