<script setup lang="ts">
import { Clipboard } from '@ark-ui/vue/clipboard'
import { CheckIcon, ClipboardCopyIcon } from 'lucide-vue-next'
import button from 'styles/button.module.css'
import styles from 'styles/clipboard.module.css'
</script>

<template>
  <Clipboard.Root :class="styles.Root" default-value="https://ark-ui.com">
    <Clipboard.Label :class="styles.Label">Copy this link</Clipboard.Label>
    <Clipboard.Context v-slot="clipboard">
      <button :class="button.Root" @click="clipboard.copy()">
        <CheckIcon v-if="clipboard.copied" />
        <ClipboardCopyIcon v-else />
        {{ clipboard.copied ? 'Copied!' : 'Copy' }}
      </button>
    </Clipboard.Context>
  </Clipboard.Root>
</template>
