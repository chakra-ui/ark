<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory.ts'
import type { UseFileUploadReturn } from './use-file-upload.ts'

interface RootProviderProps {
  value: UnwrapRef<UseFileUploadReturn>
}

export interface FileUploadRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface FileUploadRootProviderProps
  extends
    FileUploadRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory.ts'
import { FileUploadProvider } from './use-file-upload-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<FileUploadRootProviderProps>()
const fileUpload = computed(() => props.value)

FileUploadProvider(fileUpload)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="fileUpload.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
