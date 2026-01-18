<script setup lang="ts">
import { Clipboard, useClipboard } from '@ark-ui/vue/clipboard'
import { CheckIcon, ClipboardCopyIcon } from 'lucide-vue-next'
import styles from 'styles/clipboard.module.css'

const clipboard = useClipboard({ value: 'https://ark-ui.com' })
</script>

<template>
  <div class="stack">
    <output>value: {{ clipboard.value }}, copied: {{ String(clipboard.copied) }}</output>
    <Clipboard.RootProvider :class="styles.Root" :value="clipboard">
      <Clipboard.Label :class="styles.Label">Copy this link</Clipboard.Label>
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
    </Clipboard.RootProvider>
  </div>
</template>
