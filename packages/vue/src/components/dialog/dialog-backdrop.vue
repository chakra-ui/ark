<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface DialogBackdropBaseProps extends PolymorphicProps {}
export interface DialogBackdropProps
  extends
    DialogBackdropBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { mergeProps } from '@zag-js/vue'
import { computed } from 'vue'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { usePresenceContext } from '../presence'
import { ark } from '../factory'
import { useDialogContext } from './use-dialog-context'

defineProps<DialogBackdropProps>()

const dialog = useDialogContext()
const presence = usePresenceContext()

const mergedProps = computed(() => mergeProps(dialog.value.getBackdropProps(), presence.value.presenceProps))

useForwardExpose()
</script>

<template>
  <ark.div v-if="!presence.unmounted" v-bind="mergedProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
