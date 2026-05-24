<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types.ts'
import type { PolymorphicProps } from '../factory.ts'
import type { RootEmits, RootProps } from './presence.types.ts'

export interface PresenceBaseProps extends RootProps, PolymorphicProps {}
export interface PresenceProps
  extends
    PresenceBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface PresenceEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { usePresence } from './use-presence.ts'
import { PresenceProvider } from './use-presence-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = withDefaults(defineProps<PresenceProps>(), {
  immediate: undefined,
  lazyMount: undefined,
  present: undefined,
  skipAnimationOnMount: undefined,
  unmountOnExit: undefined,
} satisfies BooleanDefaults<RootProps>)

const emits = defineEmits<PresenceEmits>()

// @ts-expect-error TODO tweak EmitFn
const presence = usePresence(props, emits)
PresenceProvider(presence)

useForwardExpose()
</script>

<template>
  <ark.div
    v-if="!presence.unmounted"
    v-bind="presence.presenceProps"
    :as-child="asChild"
    data-scope="presence"
    data-part="root"
  >
    <slot />
  </ark.div>
</template>
