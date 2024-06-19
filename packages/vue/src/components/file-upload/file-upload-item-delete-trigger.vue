<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface FileUploadItemDeleteTriggerBaseProps extends PolymorphicProps {}
export interface FileUploadItemDeleteTriggerProps
  extends FileUploadItemDeleteTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'
import { useFileUploadItemPropsContext } from './use-file-upload-item-props-context'

defineProps<FileUploadItemDeleteTriggerProps>()
const fileUpload = useFileUploadContext()
const itemProps = useFileUploadItemPropsContext()
</script>

<template>
  <ark.button v-bind="fileUpload.getItemDeleteTriggerProps(itemProps)" :as-child="asChild">
    <slot />
  </ark.button>
</template>
