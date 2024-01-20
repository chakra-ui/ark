<script setup lang="ts">
import { withDefaults } from 'vue'
import { ark } from '../factory'
import { usePresence } from './use-presence'
import type { PresenceEmits, PresenceProps } from './presence.props'

const props = withDefaults(defineProps<PresenceProps>(), {
  lazyMount: false,
  unmountOnExit: false,
})
const emit = defineEmits<PresenceEmits>()
const slots = defineSlots<{
  default(): any
}>()

const api = usePresence(props, emit)
</script>

<template>
  <ark.div
    v-if="!api.isUnmounted"
    v-bind="api.presenceProps"
    data-scope="presence"
    data-part="root"
  >
    <slot v-if="slots.default()" />
  </ark.div>
</template>
