<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { UseDownloadProps } from './use-download'

export interface DownloadTriggerBaseProps extends PolymorphicProps, UseDownloadProps {}

export interface DownloadTriggerProps
  extends
    DownloadTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { useDownload } from './use-download'

const props = defineProps<DownloadTriggerProps>()

const { download } = useDownload(() => ({
  fileName: props.fileName,
  mimeType: props.mimeType,
  data: props.data,
}))

const handleClick = (e: MouseEvent) => {
  if (e.defaultPrevented) return
  download()
}

useForwardExpose()
</script>

<template>
  <ark.button :as-child="asChild" type="button" @click="handleClick">
    <slot />
  </ark.button>
</template>
