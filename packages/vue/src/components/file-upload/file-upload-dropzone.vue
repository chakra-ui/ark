<script lang="ts">
import type { DropzoneProps } from '@zag-js/file-upload'
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types.ts'
import type { PolymorphicProps } from '../factory.ts'

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

const fileUpload = useFileUploadContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="fileUpload.getDropzoneProps(props)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
