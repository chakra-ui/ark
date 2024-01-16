<script lang="ts">
import { type HTMLArkProps } from '../factory'
import { type UsePresenceProps } from './use-presence'
import type { Assign } from '../types'
export interface PresenceProps extends Assign<HTMLArkProps<'div'>, UsePresenceProps> {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { usePresence } from './use-presence'
import { presenceProps, type PresenceEmits } from './presence.props'

const props = defineProps(presenceProps)
const emit = defineEmits<PresenceEmits>()

const api = usePresence(props, emit)
</script>

<template>
  <ark.div
    v-if="!api.isUnmounted"
    v-bind="api.presenceProps"
    data-scope="presence"
    data-part="root"
  >
    <slot v-if="$slots.default" />
  </ark.div>
</template>
