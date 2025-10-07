<script setup lang="ts">
import { useForwardPropsEmits } from '@ark-ui/vue'
import { Collapsible, type CollapsibleRootEmits, type CollapsibleRootProps } from '@ark-ui/vue/collapsible'
import { ChevronRightIcon } from 'lucide-vue-next'

const props = defineProps<CollapsibleRootProps>()
const emits = defineEmits<CollapsibleRootEmits>()
const localProps = useForwardPropsEmits(props, emits)
</script>

<template>
  <Collapsible.Root v-bind="localProps">
    <Collapsible.Trigger>
      Toggle
      <Collapsible.Indicator>
        <ChevronRightIcon />
      </Collapsible.Indicator>
    </Collapsible.Trigger>
    <Collapsible.Content>Content</Collapsible.Content>
  </Collapsible.Root>
</template>
