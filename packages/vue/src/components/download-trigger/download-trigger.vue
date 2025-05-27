<script lang="ts">
import type { FileMimeType } from '@zag-js/file-utils'
import type { ButtonHTMLAttributes } from 'vue'
import type { MaybePromise } from '../../types'
import type { PolymorphicProps } from '../factory'

export type DownloadableData = string | Blob | File

export interface DownloadTriggerBaseProps extends PolymorphicProps {
  /**
   * The name of the file to download
   */
  fileName: string
  /**
   * The data to download
   */
  data: DownloadableData | (() => MaybePromise<DownloadableData>)
  /**
   * The MIME type of the data to download
   */
  mimeType: FileMimeType
}

export interface DownloadTriggerProps
  extends DownloadTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { downloadFile } from '@zag-js/file-utils'
import { DEFAULT_ENVIRONMENT, useEnvironmentContext } from '../../providers'
import { useForwardExpose } from '../../utils'
const props = defineProps<DownloadTriggerProps>()

const env = useEnvironmentContext(DEFAULT_ENVIRONMENT)

const download = (data: DownloadableData) => {
  downloadFile({ file: data, name: props.fileName, type: props.mimeType, win: env?.value.getWindow() || window })
}

const handleClick = (e: MouseEvent) => {
  if (e.defaultPrevented) return

  if (typeof props.data === 'function') {
    const maybePromise = props.data()
    if (maybePromise instanceof Promise) {
      maybePromise.then((data) => download(data))
    } else {
      download(maybePromise)
    }
  } else {
    download(props.data)
  }
}

useForwardExpose()
</script>

<template>
  <ark.button :as-child="asChild" type="button" @click="handleClick">
    <slot />
  </ark.button>
</template>
