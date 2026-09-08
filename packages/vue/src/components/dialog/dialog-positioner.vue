<script lang="ts">
import type { PositionerState } from '@zag-js/dialog'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface DialogPositionerState extends PositionerState {}
export interface DialogPositionerBaseProps extends PolymorphicProps {}
export interface DialogPositionerProps
  extends
    DialogPositionerBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { usePresenceContext } from '../presence/index.ts'
import { useDialogContext } from './use-dialog-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<DialogPositionerProps>()

defineSlots<PolymorphicSlots<DialogPositionerState>>()

const dialog = useDialogContext()
const presence = usePresenceContext()

useForwardExpose()
</script>

<template>
  <ark.div
    v-if="!presence.unmounted"
    v-bind="dialog.getPositionerProps()"
    :state="dialog.getPositionerState()"
    :as-child="asChild"
  >
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
