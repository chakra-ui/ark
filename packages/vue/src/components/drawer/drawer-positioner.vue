<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

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
import { ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useDrawerContext } from './use-drawer-context'
import { useForwardExpose } from '../../utils/use-forward-expose'

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
