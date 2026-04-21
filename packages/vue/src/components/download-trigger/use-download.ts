import { type FileMimeType, downloadFile } from '@zag-js/file-utils'
import { type MaybeRefOrGetter, toValue } from 'vue'
import { DEFAULT_ENVIRONMENT, useEnvironmentContext } from '../../providers'
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

export const useDownload = (props: MaybeRefOrGetter<UseDownloadProps>): UseDownloadReturn => {
  const env = useEnvironmentContext(DEFAULT_ENVIRONMENT)

  const download = () => {
    const { fileName, mimeType, data } = toValue(props)
    const win = env?.value.getWindow() || window
    const saveToDisk = (value: DownloadableData) => {
      downloadFile({ file: value, name: fileName, type: mimeType, win })
    }
    if (typeof data === 'function') {
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
