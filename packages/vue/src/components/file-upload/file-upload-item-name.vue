<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface FileUploadItemNameBaseProps extends PolymorphicProps {}
export interface FileUploadItemNameProps
  extends
    FileUploadItemNameBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useFileUploadContext } from './use-file-upload-context.ts'
import { useFileUploadItemPropsContext } from './use-file-upload-item-props-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<FileUploadItemNameProps>()
const fileUpload = useFileUploadContext()
const itemProps = useFileUploadItemPropsContext()
const slots = defineSlots()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="fileUpload.getItemNameProps(itemProps)" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot>
        {{ slots.default?.() || itemProps.file.name }}
      </slot>
    </template>
  </ark.div>
</template>
