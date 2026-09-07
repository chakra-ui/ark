<script lang="ts">
import type { ItemGroupProps, ItemGroupState } from '@zag-js/file-upload'
import { computed, type HTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'
import { pick } from '@zag-js/utils'

export interface FileUploadItemGroupState extends ItemGroupState {}
export interface FileUploadItemGroupBaseProps extends PolymorphicProps, ItemGroupProps {}
export interface FileUploadItemGroupProps
  extends
    FileUploadItemGroupBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { useFileUploadContext } from './use-file-upload-context.ts'
import { FileUploadItemGroupPropsProvider } from './use-file-upload-item-group-props-context.ts'

const props = defineProps<FileUploadItemGroupProps>()

defineSlots<PolymorphicSlots<FileUploadItemGroupState>>()
const groupProps = computed(() => pick(props, ['type']))

const fileUpload = useFileUploadContext()

FileUploadItemGroupPropsProvider(groupProps)

useForwardExpose()
</script>

<template>
  <ark.ul
    v-bind="fileUpload.getItemGroupProps(groupProps)"
    :state="fileUpload.getItemGroupState(groupProps)"
    :as-child="asChild"
  >
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.ul>
</template>
