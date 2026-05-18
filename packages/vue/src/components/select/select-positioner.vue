<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

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
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { usePresenceContext } from '../presence/index.ts'
import { useSelectContext } from './use-select-context.ts'

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
