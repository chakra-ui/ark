<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { UseFileUploadReturn } from './use-file-upload'

interface RootProviderProps {
  value: UnwrapRef<UseFileUploadReturn>
}

export interface FileUploadRootProviderProps
  extends RootProviderProps,
    PolymorphicProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory'
import { FileUploadProvider } from './use-file-upload-context'

const props = defineProps<FileUploadRootProviderProps>()
const fileUpload = computed(() => props.value)

FileUploadProvider(fileUpload)
</script>

<template>
  <ark.div v-bind="fileUpload.rootProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
