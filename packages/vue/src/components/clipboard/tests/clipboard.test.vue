<script setup lang="ts">
import { Clipboard, type ClipboardRootEmits, type ClipboardRootProps } from '../'
import { useForwardPropsEmits } from '../../..'

const props = defineProps<ClipboardRootProps>()
const emits = defineEmits<ClipboardRootEmits>()
const localProps = useForwardPropsEmits(props, emits)
</script>

<template>
  <Clipboard.Root default-value="https.//ark-ui.com" v-bind="localProps">
    <Clipboard.Label>Copy this link</Clipboard.Label>
    <Clipboard.Control>
      <Clipboard.Input />
      <Clipboard.Trigger>
        <Clipboard.Indicator>
          Copy
          <template #copied>Copied!</template>
        </Clipboard.Indicator>
      </Clipboard.Trigger>
    </Clipboard.Control>
  </Clipboard.Root>
</template>
