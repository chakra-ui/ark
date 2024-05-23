<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface FileUploadItemNameProps
  extends PolymorphicProps,
    /* @vue-ignore */ HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'
import { useFileUploadItemPropsContext } from './use-file-upload-item-props-context'
import { useSlots } from 'vue'

defineProps<FileUploadItemNameProps>()
const fileUpload = useFileUploadContext()
const itemProps = useFileUploadItemPropsContext()
const slots = useSlots()
</script>

<template>
  <ark.div v-bind="fileUpload.getItemNameProps(itemProps)" :as-child="asChild">
    <slot>
      {{ slots.default?.() || itemProps.file.name }}
    </slot>
  </ark.div>
</template>
