<script lang="ts">
import type { BooleanDefaults } from '../../types'
import type { RootEmits, RootProps } from './file-upload.types'

export interface FileUploadRootProps extends RootProps, PolymorphicProps {}
export interface FileUploadRootEmits extends RootEmits {}
interface BooleanProps extends BooleanDefaults<RootProps> {}
</script>

<script setup lang="ts">
import { ark, type PolymorphicProps } from '../factory'
import { useFileUpload } from './use-file-upload'
import { FileUploadProvider } from './use-file-upload-context'

const props = withDefaults(defineProps<FileUploadRootProps>(), {
  allowDrop: undefined,
  directory: undefined,
  disabled: undefined,
} satisfies BooleanProps)

const emits = defineEmits<FileUploadRootEmits>()

const fileUpload = useFileUpload(props, emits)
FileUploadProvider(fileUpload)
</script>

<template>
  <ark.div v-bind="fileUpload.rootProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
