<script setup lang="ts">
import { Clipboard } from '../'
import { CheckIcon, ClipboardCopyIcon } from './icons'
import './clipboard.css'
</script>

<template>
  <Story title="Clipboard">
    <Variant title="Basic">
      <Clipboard.Root value="https.//ark-ui.com">
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
      </Clipboard.Root>
    </Variant>
    <Variant title="RenderFn">
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
    </Variant>
  </Story>
</template>
