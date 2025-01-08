<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types'
import type { PolymorphicProps } from '../factory'
import type { RootEmits, RootProps } from './file-upload.types'

export interface FileUploadRootBaseProps extends RootProps, PolymorphicProps {}
export interface FileUploadRootProps
  extends FileUploadRootBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface FileUploadRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useFileUpload } from './use-file-upload'
import { FileUploadProvider } from './use-file-upload-context'
import { useForwardExpose } from '../../utils'

const props = withDefaults(defineProps<FileUploadRootProps>(), {
  allowDrop: undefined,
  directory: undefined,
  disabled: undefined,
  invalid: undefined,
  preventDocumentDrop: undefined,
  required: undefined,
} satisfies BooleanDefaults<RootProps>)

const emits = defineEmits<FileUploadRootEmits>()

const fileUpload = useFileUpload(props, emits)
FileUploadProvider(fileUpload)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="fileUpload.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
