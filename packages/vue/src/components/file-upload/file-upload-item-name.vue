<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface FileUploadItemNameBaseProps extends PolymorphicProps {}
export interface FileUploadItemNameProps
  extends FileUploadItemNameBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'
import { useFileUploadItemPropsContext } from './use-file-upload-item-props-context'
import { useForwardExpose } from '../../utils'

defineProps<FileUploadItemNameProps>()
const fileUpload = useFileUploadContext()
const itemProps = useFileUploadItemPropsContext()
const slots = defineSlots()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="fileUpload.getItemNameProps(itemProps)" :as-child="asChild">
    <slot>
      {{ slots.default?.() || itemProps.file.name }}
    </slot>
  </ark.div>
</template>
