<script setup lang="ts">
import { Collapsible, type CollapsibleRootEmits, type CollapsibleRootProps } from '@ark-ui/vue/collapsible'
import { useForwardPropsEmits } from '@ark-ui/vue'

const props = defineProps<CollapsibleRootProps>()
const emits = defineEmits<CollapsibleRootEmits>()
const localProps = useForwardPropsEmits(props, emits)
</script>

<template>
  <Collapsible.Root v-bind="localProps">
    <Collapsible.Trigger>Toggle</Collapsible.Trigger>
    <Collapsible.Content>Content</Collapsible.Content>
  </Collapsible.Root>
</template>
