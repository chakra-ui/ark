<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

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
import { ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useDialogContext } from './use-dialog-context'
import { useForwardExpose } from '../../utils/use-forward-expose'

defineProps<DialogPositionerProps>()

const dialog = useDialogContext()
const presence = usePresenceContext()

useForwardExpose()
</script>

<template>
  <ark.div v-if="!presence.unmounted" v-bind="dialog.getPositionerProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
