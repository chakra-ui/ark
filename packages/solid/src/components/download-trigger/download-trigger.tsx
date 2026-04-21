import { type JSX, splitProps } from 'solid-js'
import type { HTMLProps, PolymorphicProps } from '../factory'
import { ark } from '../factory'
import { type UseDownloadProps, useDownload } from './use-download'

export interface DownloadTriggerBaseProps extends PolymorphicProps<'button'>, UseDownloadProps {}

export interface DownloadTriggerProps extends HTMLProps<'button'>, DownloadTriggerBaseProps {}

export function DownloadTrigger(props: DownloadTriggerProps) {
  const [downloadProps, restProps] = splitProps(props, ['fileName', 'data', 'mimeType', 'onClick'])
  const { download } = useDownload(() => ({
    fileName: downloadProps.fileName,
    mimeType: downloadProps.mimeType,
    data: downloadProps.data,
  }))

  const handleClick: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> = (e) => {
    if (typeof downloadProps.onClick === 'function') {
      downloadProps.onClick(e)
    }

    if (e.defaultPrevented) return

    download()
  }

  return <ark.button {...restProps} type="button" onClick={handleClick} />
}
