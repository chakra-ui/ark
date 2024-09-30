<script lang="ts">
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface FileUploadHiddenInputBaseProps extends PolymorphicProps {}
export interface FileUploadHiddenInputProps
  extends FileUploadHiddenInputBaseProps,
    /**
     * @vue-ignore
     */
    InputHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'
import { useFieldContext } from '../field'
import { useForwardExpose } from '../../utils'

defineProps<FileUploadHiddenInputProps>()
const fileUpload = useFileUploadContext()
const field = useFieldContext()

useForwardExpose()
</script>

<template>
  <ark.input
    :aria-describedby="field?.ariaDescribedby"
    v-bind="fileUpload.getHiddenInputProps()"
    :as-child="asChild"
  >
    <slot />
  </ark.input>
</template>
