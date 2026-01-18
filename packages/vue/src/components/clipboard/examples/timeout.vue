<script setup lang="ts">
import { Clipboard } from '@ark-ui/vue/clipboard'
import { CheckIcon, ClipboardCopyIcon } from 'lucide-vue-next'
import styles from 'styles/clipboard.module.css'
</script>

<template>
  <Clipboard.Root :class="styles.Root" default-value="https://ark-ui.com" :timeout="5000">
    <Clipboard.Label :class="styles.Label">Copy this link (5 second timeout)</Clipboard.Label>
    <Clipboard.Control :class="styles.Control">
      <Clipboard.Input :class="styles.Input" />
      <Clipboard.Trigger :class="styles.Trigger">
        <Clipboard.Indicator :class="styles.Indicator">
          <ClipboardCopyIcon />
          <template #copied>
            <CheckIcon />
          </template>
        </Clipboard.Indicator>
      </Clipboard.Trigger>
    </Clipboard.Control>
  </Clipboard.Root>
</template>
