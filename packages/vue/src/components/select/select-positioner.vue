<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SelectPositionerBaseProps extends PolymorphicProps {}
export interface SelectPositionerProps
  extends
    SelectPositionerBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose'
import { ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useSelectContext } from './use-select-context'

defineProps<SelectPositionerProps>()

const select = useSelectContext()
const presence = usePresenceContext()

useForwardExpose()
</script>

<template>
  <ark.div v-if="!presence.unmounted" v-bind="select.getPositionerProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
