import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { Presence, splitPresenceProps, type PresenceProps } from '../presence'
import type { Assign } from '../types'
import { useFileUploadContext } from './file-upload-context'

export interface FileUploadItemNameProps
  extends Assign<HTMLArkProps<'div'>, Omit<PresenceProps, 'children'>> {}

export const FileUploadItemName = forwardRef<HTMLDivElement, FileUploadItemNameProps>(
  (props, ref) => {
    const [presenceProps, localProps] = splitPresenceProps(props)
    const api = useFileUploadContext()

    return (
      <Presence present={api.isOpen} {...presenceProps}>
        <FileUploadInnerItemName ref={ref} {...localProps} />
      </Presence>
    )
  },
)

FileUploadItemName.displayName = 'FileUploadItemName'

const FileUploadInnerItemName = forwardRef<HTMLDivElement, FileUploadItemNameProps>(
  function FileUploadInnerItemName(props, ref) {
    const api = useFileUploadContext()
    const mergedProps = mergeProps(api.contentProps, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)
