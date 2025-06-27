<script lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import { getWindow } from '@zag-js/dom-query'
  import { type FileMimeType, downloadFile } from '@zag-js/file-utils'
  import { isFunction } from '@zag-js/utils'
  import { Ark } from '../factory'

  export type DownloadableData = string | Blob | File
  export type MaybePromise<T> = T | Promise<T>

  export interface DownloadTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {
    fileName: string
    data: DownloadableData | (() => MaybePromise<DownloadableData>)
    mimeType: FileMimeType
  }

  export interface DownloadTriggerProps extends Assign<HTMLProps<'button'>, DownloadTriggerBaseProps> {}

  let { ref = $bindable(), fileName, data, mimeType, onclick, ...restProps }: DownloadTriggerProps = $props()

  const download = (fileData: DownloadableData, win: Window & typeof globalThis) => {
    downloadFile({ file: fileData, name: fileName, type: mimeType, win })
  }

  const handleClick = (e: MouseEvent & { currentTarget: HTMLButtonElement }) => {
    const win = getWindow(e.currentTarget)
    onclick?.(e)
    if (e.defaultPrevented) return

    if (isFunction(data)) {
      const maybePromise = data()
      if (maybePromise instanceof Promise) {
        maybePromise.then((result) => download(result, win))
      } else {
        download(maybePromise, win)
      }
    } else {
      download(data, win)
    }
  }
</script>

<Ark as="button" bind:ref {...restProps} type="button" onclick={handleClick} />
