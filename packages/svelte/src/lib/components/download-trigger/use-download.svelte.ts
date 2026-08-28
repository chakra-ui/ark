import { useEnvironmentContext } from '$lib/providers/environment'
import { type FileMimeType, downloadFile } from '@zag-js/file-utils'
import { type MaybeFunction, isFunction, runIfFn } from '@zag-js/utils'

export type DownloadableData = string | Blob | File
export type MaybePromise<T> = T | Promise<T>

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

export const useDownload = (props: MaybeFunction<UseDownloadProps>): UseDownloadReturn => {
  const env = useEnvironmentContext()

  const download = () => {
    const { fileName, mimeType, data } = runIfFn(props)
    const win = env().getWindow()
    const saveToDisk = (value: DownloadableData) => {
      downloadFile({ file: value, name: fileName, type: mimeType, win })
    }
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
