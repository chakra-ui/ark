<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface DialogDescriptionBaseProps extends PolymorphicProps {}
export interface DialogDescriptionProps
  extends DialogDescriptionBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useDialogContext } from './use-dialog-context'
import { useForwardExpose } from '../../utils'

defineProps<DialogDescriptionProps>()
const dialog = useDialogContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="dialog.getDescriptionProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
