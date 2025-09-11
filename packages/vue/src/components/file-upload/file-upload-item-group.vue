<script lang="ts">
import type { ItemGroupProps } from '@zag-js/file-upload'
import { computed, type HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'
import { pick } from '@zag-js/utils'

export interface FileUploadItemGroupBaseProps extends PolymorphicProps, ItemGroupProps {}
export interface FileUploadItemGroupProps
  extends FileUploadItemGroupBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'
import { FileUploadItemGroupPropsProvider } from './use-file-upload-item-group-props-context'

const props = defineProps<FileUploadItemGroupProps>()
const groupProps = computed(() => pick(props, ['type']))

const fileUpload = useFileUploadContext()

FileUploadItemGroupPropsProvider(groupProps)

useForwardExpose()
</script>

<template>
  <ark.ul v-bind="fileUpload.getItemGroupProps(groupProps)" :as-child="asChild">
    <slot />
  </ark.ul>
</template>
