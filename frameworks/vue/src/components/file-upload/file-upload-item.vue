<script lang="ts">
import type { ItemProps } from '@zag-js/file-upload'
import type { PolymorphicProps } from '../factory'

export interface FileUploadItemProps extends PolymorphicProps, ItemProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'

const props = defineProps<FileUploadItemProps>()
const fileUpload = useFileUploadContext()
</script>

<template>
  <ark.li v-bind="fileUpload.getItemProps(props)" :as-child="asChild">
    <slot />
  </ark.li>
</template>
