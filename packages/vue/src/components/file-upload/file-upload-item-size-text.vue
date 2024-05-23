<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface FileUploadItemSizeTextProps
  extends PolymorphicProps,
    /* @vue-ignore */ HTMLAttributes {}
</script>

<script setup lang="ts">
import { useSlots } from 'vue'
import { ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'
import { useFileUploadItemPropsContext } from './use-file-upload-item-props-context'

defineProps<FileUploadItemSizeTextProps>()
const fileUpload = useFileUploadContext()
const itemProps = useFileUploadItemPropsContext()
const slots = useSlots()
</script>

<template>
  <ark.div v-bind="fileUpload.getItemSizeTextProps(itemProps)" :as-child="asChild">
    <slot>
      {{ slots.default?.() || fileUpload.getFileSize(itemProps.file) }}
    </slot>
  </ark.div>
</template>
