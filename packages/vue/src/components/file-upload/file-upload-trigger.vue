<script lang="ts">
import type { TriggerState } from '@zag-js/file-upload'
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface FileUploadTriggerState extends TriggerState {}
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
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<FileUploadTriggerProps>()

defineSlots<PolymorphicSlots<FileUploadTriggerState>>()
const fileUpload = useFileUploadContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="fileUpload.getTriggerProps()" :state="fileUpload.getTriggerState()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.button>
</template>
