<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface CascadeSelectPositionerBaseProps extends PolymorphicProps {}
export interface CascadeSelectPositionerProps
  extends
    CascadeSelectPositionerBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose'
import { ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useCascadeSelectContext } from './use-cascade-select-context'

defineProps<CascadeSelectPositionerProps>()
const cascadeSelect = useCascadeSelectContext()
const presence = usePresenceContext()

useForwardExpose()
</script>

<template>
  <ark.div v-if="!presence.unmounted" v-bind="cascadeSelect.getPositionerProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
