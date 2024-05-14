<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseFileUploadContext } from './use-file-upload-context'

export interface FileUploadContextProps
  extends SlotsType<{
    default: UnwrapRef<UseFileUploadContext>
  }> {}
</script>

<script setup lang="ts">
import { useFileUploadContext } from './use-file-upload-context'

const fileUpload = useFileUploadContext()

defineSlots<{
  default(fileUpload: UnwrapRef<UseFileUploadContext>): unknown
}>()
</script>

<template>
  <slot v-bind="fileUpload"></slot>
</template>
