<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory'
import type {
  AccordionRootProps,
  AccordionRootEmits,
  AccordionRootModelValue,
} from './accordion.props'
import { useAccordion } from './use-accordion'
import { AccordionProvider } from './accordion-context'
import { PresencePropsProvider } from '../presence'

const props = defineProps<AccordionRootProps>()
const emit = defineEmits<AccordionRootEmits>()
const modelValue = defineModel<AccordionRootModelValue>()
const slots = defineSlots<{
  default(): any
}>()

const presenceProps = computed(() => ({
  present: props.present,
  lazyMount: props.lazyMount,
  unmountOnExit: props.unmountOnExit,
}))

const api = useAccordion(props, emit, modelValue)

AccordionProvider(api)
PresencePropsProvider(presenceProps)
</script>

<template>
  <ark.div v-bind="api.rootProps">
    <slot v-if="slots.default()" />
  </ark.div>
</template>
