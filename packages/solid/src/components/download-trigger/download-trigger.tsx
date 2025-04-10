import { type FileMimeType, downloadFile } from '@zag-js/file-utils'
import { type JSX, splitProps } from 'solid-js'
import { useEnvironmentContext } from '../../providers'
import type { MaybePromise } from '../../types'
import type { HTMLProps, PolymorphicProps } from '../factory'
import { ark } from '../factory'

export type DownloadableData = string | Blob | File

export interface DownloadTriggerBaseProps extends PolymorphicProps<'button'> {
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

export interface DownloadTriggerProps extends HTMLProps<'button'>, DownloadTriggerBaseProps {}

export function DownloadTrigger(props: DownloadTriggerProps) {
  const [downloadProps, restProps] = splitProps(props, ['fileName', 'data', 'mimeType', 'onClick'])
  const env = useEnvironmentContext()

  const download = (data: DownloadableData) => {
    downloadFile({ file: data, name: downloadProps.fileName, type: downloadProps.mimeType, win: env().getWindow() })
  }

  const handleClick: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> = (e) => {
    if (typeof downloadProps.onClick === 'function') {
      downloadProps.onClick(e)
    }

    if (e.defaultPrevented) return

    if (typeof downloadProps.data === 'function') {
      const maybePromise = downloadProps.data()
      if (maybePromise instanceof Promise) {
        maybePromise.then((data) => download(data))
      } else {
        download(maybePromise)
      }
    } else {
      download(downloadProps.data)
    }
  }

  return <ark.button {...restProps} type="button" onClick={handleClick} />
}
