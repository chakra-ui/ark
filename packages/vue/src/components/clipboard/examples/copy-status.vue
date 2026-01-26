<script setup lang="ts">
import { Clipboard } from '@ark-ui/vue/clipboard'
import { CheckIcon, ClipboardCopyIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import styles from 'styles/clipboard.module.css'

const copyCount = ref(0)
</script>

<template>
  <Clipboard.Root
    :class="styles.Root"
    default-value="https://ark-ui.com"
    @status-change="
      (details) => {
        if (details.copied) {
          copyCount += 1
        }
      }
    "
  >
    <Clipboard.Control :class="styles.Control">
      <Clipboard.Trigger :class="styles.Trigger">
        <Clipboard.Indicator :class="styles.Indicator">
          <ClipboardCopyIcon />
          <template #copied>
            <CheckIcon />
          </template>
        </Clipboard.Indicator>
      </Clipboard.Trigger>
    </Clipboard.Control>
    <p>Copied {{ copyCount }} times</p>
  </Clipboard.Root>
</template>
