<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

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
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { useRenderStrategyProps } from '../../utils/use-render-strategy.ts'
import { usePresence } from '../presence/index.ts'
import { ark } from '../factory.ts'
import { useDrawerContext } from './use-drawer-context.ts'

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
