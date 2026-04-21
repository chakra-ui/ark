'use client'

import { type FileMimeType, downloadFile } from '@zag-js/file-utils'
import { isFunction } from '@zag-js/utils'
import { useEnvironmentContext } from '../../providers/environment'
import type { MaybePromise } from '../../types'

export type DownloadableData = string | Blob | File

export interface UseDownloadProps {
  /**
   * The name of the file to download
   */
  fileName: string
  /**
   * The MIME type of the data to download
   */
  mimeType: FileMimeType
  /**
   * The data to download
   */
  data: DownloadableData | (() => MaybePromise<DownloadableData>)
}

export interface UseDownloadReturn {
  /**
   * Triggers the download, resolving `data` first if it's a function or promise.
   */
  download: () => void
}

export const useDownload = (props: UseDownloadProps): UseDownloadReturn => {
  const { fileName, mimeType, data } = props
  const { getWindow } = useEnvironmentContext()

  const saveToDisk = (value: DownloadableData) => {
    downloadFile({ file: value, name: fileName, type: mimeType, win: getWindow() })
  }

  const download = () => {
    if (isFunction(data)) {
      const maybePromise = data()
      if (maybePromise instanceof Promise) {
        maybePromise.then(saveToDisk)
      } else {
        saveToDisk(maybePromise)
      }
    } else {
      saveToDisk(data)
    }
  }

  return { download }
}
