<script lang="ts">
import type { RootState } from '@zag-js/file-upload'
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types.ts'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'
import type { RootEmits, RootProps } from './file-upload.types.ts'

export interface FileUploadRootState extends RootState {}
export interface FileUploadRootBaseProps extends RootProps, PolymorphicProps {}
export interface FileUploadRootProps
  extends
    FileUploadRootBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface FileUploadRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useFileUpload } from './use-file-upload.ts'
import { FileUploadProvider } from './use-file-upload-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = withDefaults(defineProps<FileUploadRootProps>(), {
  allowDrop: undefined,
  directory: undefined,
  disabled: undefined,
  invalid: undefined,
  preventDocumentDrop: undefined,
  readOnly: undefined,
  required: undefined,
} satisfies BooleanDefaults<RootProps>)

defineSlots<PolymorphicSlots<FileUploadRootState>>()

const emits = defineEmits<FileUploadRootEmits>()

const fileUpload = useFileUpload(props, emits)
FileUploadProvider(fileUpload)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="fileUpload.getRootProps()" :state="fileUpload.getRootState()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
