<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface FileUploadTriggerBaseProps extends PolymorphicProps {}
export interface FileUploadTriggerProps
  extends
    FileUploadTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useFileUploadContext } from './use-file-upload-context.ts'
import { useFieldContext } from '../field/index.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<FileUploadTriggerProps>()
const fileUpload = useFileUploadContext()
const field = useFieldContext()

useForwardExpose()
</script>

<template>
  <ark.button :aria-describedby="field?.ariaDescribedby" v-bind="fileUpload.getTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>
