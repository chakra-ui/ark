<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface DrawerBackdropBaseProps extends PolymorphicProps {}
export interface DrawerBackdropProps
  extends
    DrawerBackdropBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { mergeProps } from '@zag-js/vue'
import { computed } from 'vue'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { useRenderStrategyProps } from '../../utils/use-render-strategy'
import { usePresence } from '../presence'
import { ark } from '../factory'
import { useDrawerContext } from './use-drawer-context'

defineProps<DrawerBackdropProps>()

const drawer = useDrawerContext()
const renderStrategy = useRenderStrategyProps()

const presence = usePresence(
  computed(() => ({
    ...renderStrategy.value,
    present: drawer.value.open,
  })),
)

const mergedProps = computed(() => mergeProps(drawer.value.getBackdropProps(), presence.value.presenceProps))

useForwardExpose()
</script>

<template>
  <ark.div v-if="!presence.unmounted" v-bind="mergedProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
