<script lang="ts">
import { mergeProps } from '@zag-js/vue'
import { type HTMLAttributes, computed } from 'vue'
import type { PolymorphicProps } from '../factory'
import { usePresenceContext } from '../presence'

export interface DialogContentBaseProps extends PolymorphicProps {}
export interface DialogContentProps
  extends DialogContentBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useDialogContext } from './use-dialog-context'
import { useForwardExpose } from '../../utils'

defineProps<DialogContentProps>()

const dialog = useDialogContext()
const presence = usePresenceContext()
const mergedProps = computed(() =>
  mergeProps(dialog.value.getContentProps(), presence.value.presenceProps),
)

useForwardExpose()
</script>

<template>
  <ark.div v-if="!presence.unmounted" v-bind="mergedProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
