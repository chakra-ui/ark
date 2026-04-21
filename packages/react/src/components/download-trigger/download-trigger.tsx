'use client'

import { forwardRef } from 'react'
import type { HTMLProps, PolymorphicProps } from '../factory'
import { ark } from '../factory'
import { type UseDownloadProps, useDownload } from './use-download'

export interface DownloadTriggerBaseProps extends PolymorphicProps, UseDownloadProps {}

export interface DownloadTriggerProps extends HTMLProps<'button'>, DownloadTriggerBaseProps {}

export const DownloadTrigger = forwardRef<HTMLButtonElement, DownloadTriggerProps>((props, ref) => {
  const { fileName, data, mimeType, ...rest } = props
  const { download } = useDownload({ fileName, mimeType, data })
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.onClick?.(e)
    if (e.defaultPrevented) return
    download()
  }
  return <ark.button ref={ref} {...rest} type="button" onClick={onClick} />
})

DownloadTrigger.displayName = 'DownloadTrigger'
