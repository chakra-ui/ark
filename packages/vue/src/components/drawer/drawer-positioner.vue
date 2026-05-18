<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface DrawerPositionerBaseProps extends PolymorphicProps {}
export interface DrawerPositionerProps
  extends
    DrawerPositionerBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { usePresenceContext } from '../presence/index.ts'
import { useDrawerContext } from './use-drawer-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<DrawerPositionerProps>()

const drawer = useDrawerContext()
const presence = usePresenceContext()

useForwardExpose()
</script>

<template>
  <ark.div v-if="!presence.unmounted" v-bind="drawer.getPositionerProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
