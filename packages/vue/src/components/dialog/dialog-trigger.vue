<script lang="ts">
import type { TriggerProps, TriggerState } from '@zag-js/dialog'
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface DialogTriggerState extends TriggerState {}
export interface DialogTriggerBaseProps extends TriggerProps, PolymorphicProps {}
export interface DialogTriggerProps
  extends
    DialogTriggerBaseProps,
    /**
     * @vue-ignore
     */
    Omit<ButtonHTMLAttributes, 'value'> {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory.ts'
import { usePresenceContext } from '../presence/index.ts'
import { useDialogContext } from './use-dialog-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<DialogTriggerProps>()

defineSlots<PolymorphicSlots<DialogTriggerState>>()
const dialog = useDialogContext()
const presence = usePresenceContext()

const triggerProps = computed(() => {
  const localProps = dialog.value.getTriggerProps(props)
  return {
    ...localProps,
    'aria-controls': presence.value.unmounted ? undefined : localProps['aria-controls'],
  }
})

useForwardExpose()
</script>

<template>
  <ark.button v-bind="triggerProps" :state="dialog.getTriggerState(props)" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.button>
</template>
