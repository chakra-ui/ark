<script lang="ts">
import type { DropzoneProps } from "@zag-js/file-upload";
import type { HTMLAttributes } from "vue";
import type { BooleanDefaults } from "../../types";
import type { PolymorphicProps } from "../factory";

export interface FileUploadDropzoneBaseProps
	extends PolymorphicProps,
		DropzoneProps {}
export interface FileUploadDropzoneProps
	extends FileUploadDropzoneBaseProps,
		/**
		 * @vue-ignore
		 */
		HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'
import { useForwardExpose } from '../../utils'

const props = withDefaults(defineProps<FileUploadDropzoneProps>(), {
  disableClick: undefined,
} satisfies BooleanDefaults<DropzoneProps>)

const fileUpload = useFileUploadContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="fileUpload.getDropzoneProps(props)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
