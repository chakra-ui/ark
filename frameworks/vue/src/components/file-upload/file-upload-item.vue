<script lang="ts">
import type { ItemProps } from '@zag-js/file-upload'
import type { PolimoprhicProps } from '../factory'

export interface FileUploadItemProps extends PolimoprhicProps, ItemProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'

const props = defineProps<FileUploadItemProps>()
const fileUpload = useFileUploadContext()
</script>

<template>
  <ark.div v-bind="fileUpload.getItemProps(props)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
