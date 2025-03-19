import { type FileMimeType, downloadFile } from '@zag-js/file-utils'
import { forwardRef } from 'react'
import { useEnvironmentContext } from '../../providers'
import type { MaybePromise } from '../../types'
import type { HTMLProps, PolymorphicProps } from '../factory'
import { ark } from '../factory'

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

export interface DownloadTriggerProps extends HTMLProps<'button'>, DownloadTriggerBaseProps {}

export const DownloadTrigger = forwardRef<HTMLButtonElement, DownloadTriggerProps>((props, ref) => {
  const { fileName, data, mimeType, ...rest } = props
  const { getWindow } = useEnvironmentContext()
  const download = (data: DownloadableData) => {
    downloadFile({ file: data, name: fileName, type: mimeType, win: getWindow() })
  }
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.onClick?.(e)
    if (e.defaultPrevented) return
    if (typeof data === 'function') {
      const maybePromise = data()
      if (maybePromise instanceof Promise) {
        maybePromise.then((data) => download(data))
      } else {
        download(maybePromise)
      }
    } else {
      download(data)
    }
  }
  return <ark.button ref={ref} {...rest} type="button" onClick={onClick} />
})

DownloadTrigger.displayName = 'DownloadTrigger'
