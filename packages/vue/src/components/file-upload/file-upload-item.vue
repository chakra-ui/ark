<script lang="ts">
import type { ItemProps } from '@zag-js/file-upload'
import type { LiHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface FileUploadItemBaseProps extends ItemProps, PolymorphicProps {}
export interface FileUploadItemProps
  extends FileUploadItemBaseProps,
    /**
     * @vue-ignore
     */
    LiHTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'
import { useFileUploadItemGroupPropsContext } from './use-file-upload-item-group-props-context'
import { FileUploadItemPropsProvider } from './use-file-upload-item-props-context'

const props = defineProps<FileUploadItemBaseProps>()

const fileUpload = useFileUploadContext()

const itemGroupProps = useFileUploadItemGroupPropsContext()
const itemPropsContext = computed(() => ({ ...props, type: itemGroupProps.value.type }))
FileUploadItemPropsProvider(itemPropsContext)

useForwardExpose()
</script>

<template>
  <ark.li v-bind="fileUpload.getItemProps(itemPropsContext)" :as-child="asChild">
    <slot />
  </ark.li>
</template>
