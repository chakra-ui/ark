<script lang="ts">
import type { LabelHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface FileUploadLabelBaseProps extends PolymorphicProps {}
export interface FileUploadLabelProps
  extends
    FileUploadLabelBaseProps,
    /**
     * @vue-ignore
     */
    LabelHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useFileUploadContext } from './use-file-upload-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<FileUploadLabelProps>()
const fileUpload = useFileUploadContext()

useForwardExpose()
</script>

<template>
  <ark.label v-bind="fileUpload.getLabelProps()" :as-child="asChild">
    <slot />
  </ark.label>
</template>
