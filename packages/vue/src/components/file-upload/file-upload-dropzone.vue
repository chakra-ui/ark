<script lang="ts">
import type { DropzoneProps, DropzoneState } from '@zag-js/file-upload'
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types.ts'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface FileUploadDropzoneState extends DropzoneState {}
export interface FileUploadDropzoneBaseProps extends PolymorphicProps, DropzoneProps {}
export interface FileUploadDropzoneProps
  extends
    FileUploadDropzoneBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useFileUploadContext } from './use-file-upload-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = withDefaults(defineProps<FileUploadDropzoneProps>(), {
  disableClick: undefined,
} satisfies BooleanDefaults<DropzoneProps>)

defineSlots<PolymorphicSlots<FileUploadDropzoneState>>()

const fileUpload = useFileUploadContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="fileUpload.getDropzoneProps(props)" :state="fileUpload.getDropzoneState()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
